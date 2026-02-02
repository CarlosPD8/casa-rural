"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type CarouselProps = {
  images?: { src: string; alt: string }[];
  intervalMs?: number;
};

export default function Carousel({
  images,
  intervalMs = 4500,
}: CarouselProps) {
  const slides = useMemo(
    () =>
      images ?? [
        { src: "/photos/casa-1.jpeg", alt: "Fachada de la casa rural" },
        { src: "/photos/casa-1.jpeg", alt: "Salón principal acogedor" },
        { src: "/photos/casa-1.jpeg", alt: "Cocina equipada" },
        { src: "/photos/casa-1.jpeg", alt: "Habitación luminosa" },
      ],
    [images]
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  const go = (next: number) => {
    const total = slides.length;
    setIndex(((next % total) + total) % total);
  };

  useEffect(() => {
    if (paused || slides.length <= 1) return;

    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [paused, slides.length, intervalMs]);

  return (
    <section
      aria-label="Galería de imágenes"
      className="relative overflow-hidden rounded-3xl shadow-lg border border-black/5 bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/10]">
        <Image
          key={slides[index].src}
          src={slides[index].src}
          alt={slides[index].alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
        <button
          type="button"
          className="btn btn-secondary bg-white/80 backdrop-blur hover:bg-white"
          onClick={() => go(index - 1)}
          aria-label="Imagen anterior"
        >
          ‹
        </button>
        <button
          type="button"
          className="btn btn-secondary bg-white/80 backdrop-blur hover:bg-white"
          onClick={() => go(index + 1)}
          aria-label="Imagen siguiente"
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 rounded-full bg-white/75 px-3 py-2 backdrop-blur border border-black/5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`Ir a la imagen ${i + 1}`}
            aria-current={i === index}
            className={[
              "h-2.5 w-2.5 rounded-full transition-all",
              i === index
                ? "bg-[var(--brown-800)] w-6"
                : "bg-[var(--brown-400)] hover:bg-[var(--brown-600)]",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}

