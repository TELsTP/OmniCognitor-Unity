
export interface GitHubRepo {
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  updated_at: string;
}

export const githubService = {
  async getRepo(token: string, owner: string, repo: string): Promise<GitHubRepo> {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
  },

  async createRepo(token: string, owner: string, repo: string): Promise<GitHubRepo> {
    // Try to create in organization first, then fallback to user if owner is the user
    // For simplicity, we'll try to create it where the 'owner' specifies
    // If 'owner' is an org, the endpoint is /orgs/{org}/repos
    // If 'owner' is the user, the endpoint is /user/repos
    
    // First, check if the owner is the authenticated user
    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: `token ${token}` }
    });
    const userData = await userRes.json();
    const isUser = userData.login === owner;

    const url = isUser ? 'https://api.github.com/user/repos' : `https://api.github.com/orgs/${owner}/repos`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: repo,
        description: 'OmniCognitor Unity Sovereign Repository',
        private: true,
        auto_init: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create repository: ${errorData.message}`);
    }

    return response.json();
  },

  async getUserOrgs(token: string): Promise<any[]> {
    const response = await fetch('https://api.github.com/user/orgs', {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch organizations: ${response.statusText}`);
    }

    return response.json();
  },

  async listRepos(token: string): Promise<GitHubRepo[]> {
    const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.statusText}`);
    }

    return response.json();
  },

  async getRepoContents(token: string, owner: string, repo: string, path: string = ''): Promise<any[]> {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch contents: ${response.statusText}`);
    }

    return response.json();
  },

  async getFileContent(token: string, owner: string, repo: string, path: string): Promise<string> {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const data = await response.json();
    return atob(data.content);
  },

  async pushUnityManifest(token: string, owner: string, repo: string, content: any) {
    const path = 'unity-manifest.json';
    const message = `Unity Sync: ${new Date().toISOString()}`;
    
    // Check if repo exists first
    try {
      const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      
      if (repoRes.status === 404) {
        // Repo not found, try to create it
        await this.createRepo(token, owner, repo);
        // Wait a bit for GitHub to initialize the repo
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else if (!repoRes.ok) {
        throw new Error(`GitHub API error: ${repoRes.statusText}`);
      }
    } catch (e: any) {
      if (e.message.includes('Failed to create repository')) {
        throw e;
      }
      // Other errors might be connection issues
    }

    // First, try to get the file to get its SHA if it exists
    let sha: string | undefined;
    try {
      const getRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        headers: {
          Authorization: `token ${token}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });
      if (getRes.ok) {
        const data = await getRes.json();
        sha = data.sha;
      }
    } catch (e) {
      // File probably doesn't exist, which is fine
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        content: btoa(JSON.stringify(content, null, 2)),
        sha,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to push to GitHub`);
    }

    return response.json();
  }
};
