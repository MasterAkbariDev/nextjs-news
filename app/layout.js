import "./globals.css";
import { ThemeProvider } from "next-themes";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        s
        {children}
      </body>
    </html>
  );
}
