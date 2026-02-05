"use client";

export default function WhatsappButton() {
  const phone = "34670294712"; // 👈 CAMBIA ESTO (sin espacios ni +)
  const message =
    "Hola, estoy interesado en reservar la casa rural. ¿Podrías darme información?";

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
   <a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Contactar por WhatsApp"
  className="
    fixed bottom-5 right-5 z-50
    flex items-center gap-3
    rounded-full
    bg-[#25D366]
    px-4 py-3
    text-white font-semibold
    shadow-[0_10px_30px_rgba(0,0,0,.25)]
    transition-transform transition-shadow
    hover:scale-105 hover:shadow-[0_15px_40px_rgba(0,0,0,.35)]
    active:scale-95
  "
>
  {/* Icon container */}
  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
 <svg
  viewBox="0 0 24 24"
  aria-hidden
  className="h-5 w-5 fill-current"
>
  <path d="M20.52 3.48A11.88 11.88 0 0 0 12.07 0C5.5 0 .17 5.33.17 11.9c0 2.1.55 4.15 1.6 5.95L0 24l6.31-1.65a11.86 11.86 0 0 0 5.76 1.47h.01c6.57 0 11.9-5.33 11.9-11.9 0-3.18-1.24-6.17-3.46-8.44Zm-8.44 18.3h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.22-3.74.98 1-3.64-.24-.38a9.83 9.83 0 0 1-1.5-5.24C2.2 6.43 6.6 2.03 12.07 2.03a9.85 9.85 0 0 1 7 2.9 9.83 9.83 0 0 1 2.9 6.97c0 5.48-4.4 9.88-9.89 9.88Zm5.43-7.4c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.25-.24-.58-.49-.5-.68-.5h-.58c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.48.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.27-.2-.57-.35Z" />
</svg>

  </span>

  <span className="hidden sm:inline pr-2">WhatsApp</span>
</a>

  );
}
