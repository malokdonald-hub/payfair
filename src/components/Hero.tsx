import React from 'react';

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
      </div>
    </div>
  );
}