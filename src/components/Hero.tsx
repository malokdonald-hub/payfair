"use client";

import React, { useEffect, useState } from 'react';

const stats = [
  { value: 22, suffix: '', label: 'lata praktyki' },
  { value: 2000, suffix: '+', label: 'zakończonych spraw' },
  { value: 97, suffix: '%', label: 'skuteczności' },
  { value: 3, suffix: '', label: 'biura w Polsce' },
];

function AnimatedStat({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const stepTime = Math.max(Math.floor(duration / steps), 20);
    let current = 0;
    const increment = value / steps;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <span className="text-3xl sm:text-4xl font-bold text-white">
      {count}
      {suffix}
    </span>
  );
}

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <h1 className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Twoje prawa zasługują na<br />
          <span className="text-[#B92D2D]">najlepszą obronę</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Adwokat Artur Witkowski — 22 lata praktyki, ponad 2000 spraw. Warszawa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/kontakt" className="px-8 py-4 bg-[#B92D2D] text-white font-semibold rounded-lg hover:bg-[#D63838] transition-colors duration-300">
            Umów konsultację
          </a>
          <a href="/uslugi" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0A0A0A] transition-colors duration-300">
            Nasze usługi
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <AnimatedStat value={stat.value} suffix={stat.suffix} />
              <span className="text-sm sm:text-base text-gray-300 text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
