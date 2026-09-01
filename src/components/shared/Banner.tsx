import React from "react";
import { Link } from "react-router-dom";
import VinylSpin from "./VinylSpin";
import {
  Sparkles,
  ArrowRight,
  Disc3,
  Volume2,
  Headphones,
  Award,
} from "lucide-react";

const Banner: React.FC = () => {
  return (
    <div className="space-y-12">
      
      {/* Hero Turntable Visualizer Showcase */}
      <section className="relative overflow-hidden bg-[#13151A] text-white rounded-2xl mx-4 sm:mx-6 lg:mx-8 mt-6 border-2 border-zinc-800 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Pitch */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/40 text-amber-400 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Thế Giới Đĩa Than & Âm Thanh Analog Chuẩn Audiophile</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Chạm Vào Âm Thanh <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                Nguyên Bản Của Ký Ức
              </span>
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Khám phá hàng ngàn album đĩa than (Vinyl LP), băng cassette và phụ kiện mâm đĩa chính hãng. Tận hưởng độ chi tiết mộc mạc, dải trầm ấm áp mà định dạng digital không thể thay thế.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/product-category/vinyl"
                className="bg-amber-400 hover:bg-amber-300 text-black px-7 py-3.5 rounded-none font-extrabold text-xs uppercase tracking-wider shadow-retro hover:shadow-retro-lg transition-all flex items-center gap-2 border-2 border-black active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>Sưu Tầm Đĩa Than Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/product-category/vinyl?platform=ĐĨA%20VINTAGE"
                className="bg-transparent hover:bg-white/10 text-zinc-100 border border-zinc-500 px-6 py-3.5 rounded-none font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <Disc3 className="w-4 h-4 text-amber-400" />
                <span>Xem Đĩa Xưa Vintage</span>
              </Link>
            </div>

            {/* Value Props Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800 text-xs">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-zinc-300 font-medium">100% Phôi Đĩa Gốc</span>
              </div>
              <div className="flex items-center space-x-2">
                <Headphones className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-zinc-300 font-medium">Nghe Thử Demo</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-zinc-300 font-medium">Đóng Gói 3 Lớp Chuyên Dụng</span>
              </div>
            </div>
          </div>

          {/* Right: Spinning Turntable Visualizer */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative">
              {/* Outer Turntable Platter Base */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-zinc-900 border-4 border-zinc-700/80 shadow-2xl flex items-center justify-center p-3 relative">
                
                {/* Spinning Disc */}
                <VinylSpin
                  isPlaying={true}
                  size="xl"
                  posterUrl="https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80"
                />

                {/* Tonearm graphic placeholder */}
                <div className="absolute top-2 right-2 w-16 h-32 border-r-4 border-t-4 border-amber-400/80 rounded-tr-3xl pointer-events-none transform rotate-12"></div>
              </div>

              {/* Glowing Ambient Glow */}
              <div className="absolute -inset-4 bg-amber-500/10 rounded-full blur-2xl -z-10"></div>
            </div>
          </div>

        </div>
      </section>

      {/* Mood / Genre Pill Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-sm font-black uppercase font-display tracking-wider text-zinc-900 flex items-center gap-2">
            <Disc3 className="w-4 h-4 text-amber-500" />
            <span>Khám Phá Theo Mood & Thể Loại</span>
          </h2>
          <Link
            to="/product-category/vinyl"
            className="text-xs font-bold text-amber-700 hover:underline uppercase"
          >
            Tất cả &gt;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { title: "Jazz & Blues", query: "Jazz", emoji: "🎷" },
            { title: "Rock & Metal", query: "Rock", emoji: "🎸" },
            { title: "Pop & Indie", query: "Pop", emoji: "✨" },
            { title: "Nhạc Việt Xưa", query: "Việt", emoji: "🇻🇳" },
            { title: "Classical & OST", query: "Classical", emoji: "🎻" },
            { title: "City Pop Japan", query: "Japan", emoji: "🌆" },
          ].map((item) => (
            <Link
              key={item.title}
              to={`/product-category/vinyl?category=${encodeURIComponent(item.query)}`}
              className="bg-white border-2 border-zinc-900 rounded-lg p-3 text-center shadow-retro-sm hover:shadow-retro hover:-translate-y-0.5 transition-all group"
            >
              <span className="text-xl block mb-1">{item.emoji}</span>
              <span className="text-xs font-bold text-zinc-900 group-hover:text-amber-600 uppercase tracking-tight block truncate">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 3-Column Visual Category Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: New Vinyl */}
          <Link
            to="/product-category/vinyl?platform=ĐĨA%20MỚI"
            className="relative h-64 rounded-xl overflow-hidden border-2 border-zinc-900 shadow-retro group"
          >
            <img
              src="https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80"
              alt="Đĩa than mới"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-amber-400 text-[10px] font-black uppercase tracking-widest">
                New Releases
              </span>
              <h3 className="text-xl font-black font-display mt-0.5">
                ĐĨA THAN MỚI (SEALED)
              </h3>
              <p className="text-xs text-zinc-300 mt-1">
                Các album vừa ra lò từ Sony Music, Universal Music & Blue Note.
              </p>
            </div>
          </Link>

          {/* Card 2: Vintage Vinyl */}
          <Link
            to="/product-category/vinyl?platform=ĐĨA%20VINTAGE"
            className="relative h-64 rounded-xl overflow-hidden border-2 border-zinc-900 shadow-retro group"
          >
            <img
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80"
              alt="Đĩa vintage"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-amber-400 text-[10px] font-black uppercase tracking-widest">
                Original Pressings
              </span>
              <h3 className="text-xl font-black font-display mt-0.5">
                ĐĨA XƯA SƯU TẦM
              </h3>
              <p className="text-xs text-zinc-300 mt-1">
                Bản ép đầu những năm 70s, 80s âm thanh thuần analog mộc mạc.
              </p>
            </div>
          </Link>

          {/* Card 3: Cassette & Gear */}
          <Link
            to="/product-category/vinyl?platform=CASSETTE"
            className="relative h-64 rounded-xl overflow-hidden border-2 border-zinc-900 shadow-retro group"
          >
            <img
              src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=600&q=80"
              alt="Băng cassette"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
              <span className="text-amber-400 text-[10px] font-black uppercase tracking-widest">
                Cassette & Tape
              </span>
              <h3 className="text-xl font-black font-display mt-0.5">
                BĂNG CASSETTE RETRO
              </h3>
              <p className="text-xs text-zinc-300 mt-1">
                Ký ức Walkman với những cuộn băng cassette từ các nghệ sĩ đình đám.
              </p>
            </div>
          </Link>

        </div>
      </section>

    </div>
  );
};

export default Banner;
