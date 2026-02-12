import "./globals.css";

export const metadata = {
  title: "Vivienda Rural Huerta del Medio",
  description: "Casa rural en Granada"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
