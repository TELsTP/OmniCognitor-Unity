import requests
import os

# Set your API key here or use the environment variable
api_key = os.getenv("CODESTRAL_API_KEY", "y03YABSkmc4jPzW6JlhZhHFMBWTZeoE5")
url = "https://codestral.mistral.ai/v1/chat/completions"

def chat_with_codestral():
    print("Starting Codestral chat. Type 'exit' to end the session.\n")
    messages = []
    while True:
        prompt = input("You: ")
        if prompt.lower() == "exit":
            break
        messages.append({"role": "user", "content": prompt})

        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "codestral-latest",
            "messages": messages,
            "max_tokens": 100
        }

        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            reply = response.json()["choices"][0]["message"]["content"]
            print(f"Codestral: {reply}\n")
            messages.append({"role": "assistant", "content": reply})
        else:
            print(f"Error: {response.status_code} - {response.text}")

if __name__ == "__main__":
    chat_with_codestral()
