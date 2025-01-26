import "leaflet/dist/leaflet.css"; // Import Leaflet's default CSS
import "./globals.css"; // your global styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
