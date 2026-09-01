import React from "react";
import { useAudioPlayer } from "@/context/AudioPlayerContext";
import VinylSpin from "./VinylSpin";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Disc3,
  Music2,
} from "lucide-react";
import { Link } from "react-router-dom";

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const FloatingAudioPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    stopTrack,
    progress,
    currentTime,
    duration,
    volume,
    setVolume,
    seek,
    isMuted,
    toggleMute,
  } = useAudioPlayer();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 z-50 animate-slide-up">
      <div className="bg-[#13151A]/95 backdrop-blur-md border border-amber-500/30 text-white rounded-2xl shadow-2xl p-3 md:p-4 flex flex-col md:flex-row items-center justify-between gap-3 max-w-5xl mx-auto ring-1 ring-white/10">
        
        {/* Left: Vinyl Disc + Track Info */}
        <div className="flex items-center space-x-3 w-full md:w-auto min-w-[240px]">
          <div className="relative">
            <VinylSpin
              posterUrl={currentTrack.posterUrl}
              isPlaying={isPlaying}
              size="sm"
            />
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-black p-0.5 rounded-full">
              <Disc3 className="w-3 h-3 animate-spin" />
            </div>
          </div>
          <div className="overflow-hidden flex-1">
            <Link
              to={`/product/${encodeURIComponent(currentTrack.title)}`}
              className="font-bold text-sm text-amber-300 hover:underline truncate block"
            >
              {currentTrack.title}
            </Link>
            <p className="text-xs text-zinc-400 truncate flex items-center gap-1">
              <Music2 className="w-3 h-3 text-amber-500 inline" />
              {currentTrack.artist || "Vọc Vinyl Demo"}
            </p>
          </div>
        </div>

        {/* Center: Controls + Timeline Slider */}
        <div className="flex flex-col items-center w-full md:w-1/2 gap-1">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-amber-400 hover:bg-amber-300 text-black flex items-center justify-center transition-transform active:scale-95 shadow-md shadow-amber-500/20"
              title={isPlaying ? "Tạm dừng" : "Phát nhạc"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>
          </div>

          <div className="flex items-center space-x-2 w-full text-[11px] text-zinc-400">
            <span>{formatTime(currentTime)}</span>
            <div
              className="relative flex-1 h-2 bg-zinc-800 rounded-full cursor-pointer overflow-hidden group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = (clickX / rect.width) * 100;
                seek(percentage);
              }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Volume + Close */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={toggleMute}
            className="text-zinc-400 hover:text-white p-1"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-20 accent-amber-400 h-1 bg-zinc-700 rounded-lg cursor-pointer"
          />
          <button
            onClick={stopTrack}
            className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            title="Đóng thanh nghe thử"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={stopTrack}
          className="md:hidden absolute top-2 right-2 text-zinc-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FloatingAudioPlayer;
