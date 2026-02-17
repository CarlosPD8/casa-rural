import Script from "next/script";

export default function SeoSchema() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
    "http://localhost:3000";

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        "@id": `${baseUrl}/#lodging`,
        name: "Vivienda Rural Huerta del Medio",
        url: baseUrl,
        description:
          "Casa rural en Granada ideal para familias y grupos. Consulta disponibilidad y reserva directamente.",
        image: `${baseUrl}/images/hero1.jpg`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Granada",
          addressCountry: "ES"
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "37.1773",
          longitude: "-3.5986"
        },
        telephone: "+34XXXXXXXXX",
        priceRange: "€€",
        sameAs: [
          "https://www.instagram.com/XXXX",
          "https://www.facebook.com/XXXX"
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Cómo comprobar disponibilidad?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Consulta el calendario en la web y contacta por WhatsApp o formulario para confirmar."
            }
          },
          {
            "@type": "Question",
            name: "¿La casa se alquila completa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sí, la vivienda rural se reserva completa para garantizar privacidad."
            }
          }
        ]
      }
    ]
  };

  return (
    <Script
      id="schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
