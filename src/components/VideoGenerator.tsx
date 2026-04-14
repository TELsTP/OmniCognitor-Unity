import { useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { Upload, Video, Loader2, Download, AlertCircle } from "lucide-react";

export default function VideoGenerator() {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateVideo = async () => {
    if (!image || isGenerating) return;
    
    // Check for API key selection
    if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
      await window.aistudio.openSelectKey();
      // Proceed after opening dialog, assuming success or user will retry
    }

    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);

    try {
      // Create a fresh instance to ensure it uses the latest key from the dialog
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Base64 cleaning
      const base64Data = image.split(",")[1];
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || 'Animate this scene with professional cinematic motion',
        image: {
          imageBytes: base64Data,
          mimeType: 'image/png',
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // Polling for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        // Fetch the video with the API key
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': process.env.GEMINI_API_KEY!,
          },
        });
        
        if (response.status === 404) {
          // If requested entity not found, it might be a key issue
          if (window.aistudio) await window.aistudio.openSelectKey();
          throw new Error("Video not found or permission denied. Please re-select your API key.");
        }

        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      } else {
        throw new Error("Video generation failed - no link returned");
      }
    } catch (err: any) {
      console.error("Video Gen Error:", err);
      setError(err.message || "Failed to generate video. Please check your API key and permissions.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 bg-[#0A0E1A] border border-[#D4AF37]/20 rounded-2xl h-full flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Video className="text-[#D4AF37] w-5 h-5" />
        <h2 className="text-[#D4AF37] font-bold">Veo Media Engine</h2>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="relative aspect-video bg-black/40 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden group">
          {image ? (
            <>
              <img src={image} alt="Upload" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <label className="cursor-pointer bg-[#D4AF37] text-black px-4 py-2 rounded-lg font-bold text-sm">
                  Change Image
                  <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                </label>
              </div>
            </>
          ) : (
            <label className="cursor-pointer flex flex-col items-center gap-2 text-blue-200/40 hover:text-blue-200/60 transition-colors">
              <Upload className="w-10 h-10" />
              <span className="text-sm font-medium">Upload Image to Animate</span>
              <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
            </label>
          )}
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the animation (e.g., 'Gentle camera zoom with flowing clouds')"
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-blue-50 placeholder:text-blue-200/20 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none h-20"
        />

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <button
          onClick={generateVideo}
          disabled={!image || isGenerating}
          className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Orchestrating Veo...
            </>
          ) : (
            <>
              <Video className="w-5 h-5" />
              Generate Cinematic Video
            </>
          )}
        </button>

        {videoUrl && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">Generated Output</span>
              <a href={videoUrl} download="telstp-gen.mp4" className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-xs">
                <Download className="w-3 h-3" /> Download
              </a>
            </div>
            <video src={videoUrl} controls className="w-full rounded-xl border border-white/10 shadow-2xl" />
          </div>
        )}
      </div>
    </div>
  );
}
