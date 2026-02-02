"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  { src: "/photos/casa-1.jpeg", alt: "Salón principal de la casa rural" },
  { src: "/photos/casa-1.jpeg", alt: "Zona de estar amplia y luminosa" },
  { src: "/photos/casa-1.jpeg", alt: "Cocina totalmente equipada" },
  { src: "/photos/casa-1.jpeg", alt: "Habitación confortable" },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000);

    return () => clearInterval(id);
  }, []);

  return (
    <section
      aria-label="Galería de la casa rural"
      className="
        relative
        w-[calc(100%+3rem)]
        -mr-6
        lg:w-[calc(100%+6rem)]
        lg:-mr-12
      "
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,.25)]">
        <Image
          src={images[index].src}
          alt={images[index].alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-opacity duration-700"
        />

        {/* Soft gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </div>

      {/* Dots */}
      <div className="mt-5 flex justify-center gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Ver imagen ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`
              h-2.5 rounded-full transition-all
              ${i === index
                ? "w-8 bg-[var(--brown-700)] shadow-md"
                : "w-2.5 bg-[var(--brown-300)] hover:bg-[var(--brown-500)]"}
            `}
          />
        ))}
      </div>
    </section>
  );
}
