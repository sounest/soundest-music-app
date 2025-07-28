import { useState } from "react";

const UploadSongArtist = () => {
  const [formData, setFormData] = useState({
    title: "",
    cat: "",
    artist: "",
    cover: null as File | null,
    audio: null as File | null,
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  // const [progress, setProgress] = useState(0);
  const [previewCover, setPreviewCover] = useState<string | null>(null);
  const [previewAudio, setPreviewAudio] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;

    if (name === "cover" || name === "audio") {
      const target = e.target as HTMLInputElement;
      const file = target.files ? target.files[0] : null;

      if (file) {
        if (name === "cover" && file.size > 2 * 1024 * 1024) {
          alert("Cover image size should be less than 2MB");
          return;
        }
        if (name === "audio" && file.size > 10 * 1024 * 1024) {
          alert("Audio file size should be less than 10MB");
          return;
        }

        setFormData({ ...formData, [name]: file });

        if (name === "cover") {
          setPreviewCover(URL.createObjectURL(file));
        }
        if (name === "audio") {
          setPreviewAudio(URL.createObjectURL(file));
        }
      }
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.cover || !formData.audio) {
      alert("Please select both cover and audio files.");
      return;
    }

    setLoading(true);
    // setProgress(0);

    try {
      const uploadData = new FormData();
      uploadData.append("title", formData.title);
      uploadData.append("cat", formData.cat);
      uploadData.append("artist", formData.artist);
      uploadData.append("description", formData.description);
      uploadData.append("cover", formData.cover);
      uploadData.append("audio", formData.audio);

      // Simulate progress bar (since fetch doesn't support progress)
      // const progressInterval = setInterval(() => {
      //   setProgress((prev) => {
      //     if (prev >= 90) {
      //       clearInterval(progressInterval);
      //       return prev;
      //     }
      //     return prev + 10;
      //   });
      // }, 300);

      const response = await fetch("http://localhost:5000/api/songs/upload", {
        method: "POST",
        body: uploadData,
      });

      // clearInterval(progressInterval);
      // setProgress(100);

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Uploaded song:", data);
        setSuccess(true);

        setFormData({
          title: "",
          cat: "",
          artist: "",
          cover: null,
          audio: null,
          description: "",
        });
        setPreviewCover(null);
        setPreviewAudio(null);

        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      } else {
        alert("Failed to upload song. Try again.");
      }
    } catch (error) {
      console.error("Error uploading song:", error);
      alert("Failed to upload song. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 px-6 py-10 text-white">
      <div className="max-w-2xl mx-auto bg-[#1e1e1e] p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Upload Your Song</h2>

        {success && (
          <div className="text-green-400 text-center font-semibold mb-4">
            ✅ Song uploaded successfully!
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Song Title */}
          <input
            type="text"
            name="title"
            placeholder="Song Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="bg-gray-800 px-4 py-3 rounded-lg text-white"
          />

          {/* Category */}
          <input
            type="text"
            name="cat"
            placeholder="Category"
            value={formData.cat}
            onChange={handleChange}
            required
            className="bg-gray-800 px-4 py-3 rounded-lg text-white"
          />

          {/* Artist */}
          <input
            type="text"
            name="artist"
            placeholder="Artist Name"
            value={formData.artist}
            onChange={handleChange}
            required
            className="bg-gray-800 px-4 py-3 rounded-lg text-white"
          />

          {/* Cover Image */}
          <div className="flex flex-col items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-md">
            <label
              htmlFor="cover"
              className="w-full cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg p-6 hover:border-red-500 transition"
            >
              {previewCover ? (
                <img
                  src={previewCover}
                  alt="Cover Preview"
                  className="w-32 h-32 rounded-lg object-cover shadow-md"
                />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h.01M12 12a4 4 0 100-8 4 4 0 000 8z"
                    />
                  </svg>
                  <span className="text-gray-400 text-sm">
                    Click to upload cover image
                  </span>
                </>
              )}
              <input
                id="cover"
                type="file"
                name="cover"
                accept="image/*"
                onChange={handleChange}
                required
                className="hidden"
              />
            </label>
            {previewCover && (
              <button
                type="button"
                onClick={() => setPreviewCover(null)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            )}
          </div>

          {/* Audio File */}
          <div className="flex flex-col items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-md">
            <label
              htmlFor="audio"
              className="w-full cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg p-6 hover:border-blue-500 transition"
            >
              {previewAudio ? (
                <audio controls className="w-full rounded-lg mt-2">
                  <source src={previewAudio} type="audio/mpeg" />
                </audio>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6h13v13H9zM5 6v13h4M1 6v13h4"
                    />
                  </svg>
                  <span className="text-gray-400 text-sm">
                    Click to upload audio file
                  </span>
                </>
              )}
              <input
                id="audio"
                type="file"
                name="audio"
                accept="audio/*"
                onChange={handleChange}
                required
                className="hidden"
              />
            </label>
            {previewAudio && (
              <button
                type="button"
                onClick={() => setPreviewAudio(null)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            )}
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Song Description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="bg-gray-800 px-4 py-3 rounded-lg text-white"
          ></textarea>

          {/* Upload Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            {loading ? "Uploading..." : "Upload Song"}
          </button>

          {/* Progress */}
          {loading && (
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                
              >
                
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadSongArtist;
