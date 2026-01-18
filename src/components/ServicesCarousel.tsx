import React, { useRef } from 'react';

interface Props {
  children: React.ReactNode;
}

export const ServicesCarousel = ({ children }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      // Buscamos la primera tarjeta para saber cuánto desplazar
      const card = scrollRef.current.querySelector('article');
      if (card) {
        const scrollAmount = card.clientWidth + 24; // Ancho + el gap (6 = 24px)
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Botones de Navegación */}
      <div className="flex gap-4 justify-center md:justify-end">
        <button 
          onClick={() => scroll('left')}
          className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-white/10 transition-all border border-white/5 active:scale-90"
          aria-label="Anterior"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button 
          onClick={() => scroll('right')}
          className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-white/10 transition-all border border-white/5 active:scale-90"
          aria-label="Siguiente"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      {/* Contenedor del Scroll */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar scroll-smooth"
      >
        {children}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};