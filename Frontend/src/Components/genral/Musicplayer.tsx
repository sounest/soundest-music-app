import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
} from "react-icons/fa";
import { GiTireIronCross } from "react-icons/gi";
import { useMusic } from "../context/MusicContext";

const MusicPlayer: React.FC = () => {
  const { currentSong, nextSong, prevSong } = useMusic();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);

  const isDisabled = !currentSong;

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "--:--";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Playback error:", err));
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const value = Number(e.target.value);
    const newTime = (value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(value);
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setVolume(value);
    if (audioRef.current) audioRef.current.volume = value / 100;
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    nextSong();
  };

  useEffect(() => {
    if (!currentSong || !audioRef.current) return;

    const audio = audioRef.current;
    audio.pause();
    audio.src = currentSong.audio;
    audio.load();
    audio.currentTime = 0;
    setCurrentTime(0);
    setProgress(0);

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [currentSong]);

  return (
    <>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* ✅ Mini Player */}
      {!isFullPlayerOpen && (
        <div className="fixed bottom-0 sm:mb-[0px]  left-0 w-full bg-neutral-900 text-white z-40 border-t border-neutral-700 px-3 py-2 sm:px-4 sm:py-3 flex items-center gap-3 sm:gap-4">
          {/* Cover Image */}
          <img
            src={currentSong?.image || ""}
            alt="Song Cover"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover cursor-pointer"
            onClick={() => setIsFullPlayerOpen(true)}
          />

          {/* Song Info */}
          <div
            className="truncate flex-1 min-w-0 cursor-pointer"
            onClick={() => setIsFullPlayerOpen(true)}
          >
            <h3 className="text-sm sm:text-base font-semibold truncate">
              {currentSong?.title || "No song playing"}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 truncate">
              {currentSong?.artist || ""}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 sm:gap-4 text-lg sm:text-xl">
            <button
              onClick={prevSong}
              disabled={isDisabled}
              aria-label="Previous Song"
              title="Previous Song"
              className="hover:text-red-400"
            >
              <FaStepBackward />
            </button>
            <button
              onClick={togglePlay}
              disabled={isDisabled}
              aria-label={isPlaying ? "Pause Song" : "Play Song"}
              title={isPlaying ? "Pause Song" : "Play Song"}
              className="hover:text-red-400"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onClick={nextSong}
              disabled={isDisabled}
              aria-label="Next Song"
              title="Next Song"
              className="hover:text-red-400"
            >
              <FaStepForward />
            </button>
          </div>
        </div>
      )}

      {/* ✅ Full Player */}
      {isFullPlayerOpen && (
        <div className="fixed inset-0 bg-black text-white z-50 flex flex-col p-4 sm:p-6">
          {/* Close Button */}
          <button
            className="text-3xl mb-4 self-start hover:text-red-400"
            onClick={() => setIsFullPlayerOpen(false)}
            aria-label="Close Fullscreen Player"
            title="Close Fullscreen Player"
          >
            <GiTireIronCross />
          </button>

          {/* Main Content */}
          <div className="flex flex-col items-center justify-center flex-grow text-center">
            <img
              src={currentSong?.image || ""}
              alt="Full Cover"
              className="w-32 h-32 sm:w-56 sm:h-56 md:w-72 md:h-72 object-cover rounded-xl mb-4 sm:mb-6 shadow-lg"
            />
            <h2 className="text-lg sm:text-2xl font-bold">{currentSong?.title}</h2>
            <h4 className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">{currentSong?.artist}</h4>

            {/* Controls */}
            <div className="flex items-center gap-6 sm:gap-10 text-2xl sm:text-4xl mb-4 sm:mb-6">
              <button
                onClick={prevSong}
                disabled={isDisabled}
                aria-label="Previous Song"
                title="Previous Song"
                className="hover:text-red-400"
              >
                <FaStepBackward />
              </button>
              <button
                onClick={togglePlay}
                disabled={isDisabled}
                aria-label={isPlaying ? "Pause Song" : "Play Song"}
                title={isPlaying ? "Pause Song" : "Play Song"}
                className="hover:text-red-400"
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button
                onClick={nextSong}
                disabled={isDisabled}
                aria-label="Next Song"
                title="Next Song"
                className="hover:text-red-400"
              >
                <FaStepForward />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-3 w-full max-w-lg text-xs sm:text-sm mb-2 sm:mb-3">
              <span className="w-10 sm:w-12 text-right">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={onSeek}
                disabled={isDisabled}
                className="flex-1 accent-red-500"
                aria-label="Song Progress"
                title="Song Progress"
              />
              <span className="w-10 sm:w-12">{formatTime(duration)}</span>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3 mt-2 sm:mt-4">
              <FaVolumeUp />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={onVolumeChange}
                disabled={isDisabled}
                className="w-20 sm:w-28 accent-red-500"
                aria-label="Volume Control"
                title="Volume Control"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
