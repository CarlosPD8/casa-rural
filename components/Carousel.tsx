"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Slide = { src: string; alt: string };

export default function Carousel({
  images,
  intervalMs = 5000,
}: {
  images?: Slide[];
  intervalMs?: number;
}) {
  const slides = useMemo<Slide[]>(
    () =>
      images ?? [
        { src: "/photos/casa-1.jpeg", alt: "Salón principal de la casa rural" },
        { src: "/photos/casa-1.jpeg", alt: "Zona de estar amplia y luminosa" },
        { src: "/photos/casa-1.jpeg", alt: "Cocina totalmente equipada" },
        { src: "/photos/casa-1.jpeg", alt: "Habitación confortable" },
      ],
    [images]
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Autoplay
  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [paused, slides.length, intervalMs]);

  // Swipe (touch / mouse)
  const startX = useRef<number | null>(null);
  const dragging = useRef(false);

  const onStart = (x: number) => {
    startX.current = x;
    dragging.current = true;
    setPaused(true);
  };

  const onEnd = (x: number) => {
    if (!dragging.current || startX.current === null) return;
    const dx = x - startX.current;
    dragging.current = false;
    startX.current = null;

    // umbral de swipe
    const threshold = 40;

    if (dx > threshold) {
      setIndex((i) => (i - 1 + slides.length) % slides.length);
    } else if (dx < -threshold) {
      setIndex((i) => (i + 1) % slides.length);
    }
    setPaused(false);
  };

  return (
    <section
      aria-label="Galería de la casa rural"
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Wrapper responsive:
          - móvil: ocupa 100% sin salirse
          - lg+: se “ensancha” hacia la derecha sin romper el viewport */}
      <div className="relative lg:w-[calc(100%+3rem)] lg:-mr-12">
        <div
          className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-[2.25rem] border border-black/5
                     shadow-[0_28px_70px_rgba(0,0,0,.22)] bg-white"
          onTouchStart={(e) => onStart(e.touches[0].clientX)}
          onTouchEnd={(e) => onEnd(e.changedTouches[0].clientX)}
          onMouseDown={(e) => onStart(e.clientX)}
          onMouseUp={(e) => onEnd(e.clientX)}
        >
          <Image
            key={slides[index].src}
            src={slides[index].src}
            alt={slides[index].alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
          />

          {/* Soft overlay for aesthetics */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

          {/* small “hint” on mobile */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs border border-black/5 shadow-sm sm:hidden">
            Desliza para ver más
          </div>
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ver imagen ${i + 1}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={[
                "h-2.5 rounded-full transition-all",
                i === index
                  ? "w-8 bg-[var(--brown-800)] shadow-md"
                  : "w-2.5 bg-[var(--brown-300)] hover:bg-[var(--brown-500)]",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
