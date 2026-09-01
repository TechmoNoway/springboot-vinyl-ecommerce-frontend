import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { IProduct } from "types";

interface AudioPlayerContextType {
  currentTrack: IProduct | null;
  isPlaying: boolean;
  playTrack: (product: IProduct) => void;
  pauseTrack: () => void;
  togglePlay: () => void;
  stopTrack: () => void;
  progress: number;
  currentTime: number;
  duration: number;
  volume: number;
  setVolume: (v: number) => void;
  seek: (percentage: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

// Fallback high quality vinyl sample demo if product doesn't have demoAudioUrl
const DEFAULT_DEMO_AUDIO =
  "https://cdn.freesound.org/previews/560/560446_11861866-lq.mp3";

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTrack, setCurrentTrack] = useState<IProduct | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 30);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const playTrack = (product: IProduct) => {
    if (!audioRef.current) return;

    if (currentTrack?.id === product.id) {
      if (!isPlaying) {
        audioRef.current.play().catch(console.warn);
        setIsPlaying(true);
      }
      return;
    }

    setCurrentTrack(product);
    const audioUrl = product.demoAudioUrl || DEFAULT_DEMO_AUDIO;
    audioRef.current.src = audioUrl;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(err => {
      console.warn("Autoplay audio blocked or error:", err);
      setIsPlaying(false);
    });
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      pauseTrack();
    } else {
      if (!currentTrack) return;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.warn);
    }
  };

  const stopTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  const seek = (percentage: number) => {
    if (audioRef.current && duration > 0) {
      const target = (percentage / 100) * duration;
      audioRef.current.currentTime = target;
      setCurrentTime(target);
    }
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
    if (v > 0 && isMuted) setIsMuted(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        pauseTrack,
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
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  }
  return context;
};
