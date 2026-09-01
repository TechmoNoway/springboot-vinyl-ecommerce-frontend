import React from "react";

interface VinylSpinProps {
  posterUrl?: string;
  isPlaying?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: "w-12 h-12",
  md: "w-24 h-24",
  lg: "w-48 h-48",
  xl: "w-72 h-72",
};

const VinylSpin: React.FC<VinylSpinProps> = ({
  posterUrl,
  isPlaying = false,
  size = "md",
  className = "",
}) => {
  return (
    <div
      className={`relative rounded-full aspect-square flex items-center justify-center select-none overflow-hidden vinyl-record ${
        sizeMap[size]
      } ${isPlaying ? "animate-spin-vinyl" : ""} ${className}`}
      style={{
        boxShadow: "0 8px 24px rgba(0,0,0,0.5), inset 0 0 12px rgba(255,255,255,0.1)",
      }}
    >
      {/* Vinyl Grooves concentric rings */}
      <div className="absolute inset-0 rounded-full border border-white/5 m-1"></div>
      <div className="absolute inset-0 rounded-full border border-white/10 m-2.5"></div>
      <div className="absolute inset-0 rounded-full border border-white/5 m-4"></div>
      <div className="absolute inset-0 rounded-full border border-white/10 m-6"></div>
      <div className="absolute inset-0 rounded-full border border-white/5 m-8"></div>

      {/* Center Label */}
      <div className="relative w-1/3 h-1/3 rounded-full overflow-hidden border-2 border-amber-500/80 shadow-md flex items-center justify-center bg-zinc-900">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt="Vinyl label"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center">
            <span className="text-[8px] font-black text-black">VOC</span>
          </div>
        )}
        {/* Spindle hole */}
        <div className="absolute w-2.5 h-2.5 bg-[#121316] rounded-full border border-white/40"></div>
      </div>

      {/* Light Reflection Sheen */}
      <div
        className="absolute inset-0 pointer-events-none rounded-full"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 45%, rgba(255,255,255,0.08) 55%, transparent 100%)",
        }}
      ></div>
    </div>
  );
};

export default VinylSpin;
