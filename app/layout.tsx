import type { Metadata } from "next";
import "./studio.css";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = h.get("host") || "tlk-html-viewer.talkdedsec.chatgpt.site";
  const origin = `${host.startsWith("localhost") ? "http" : "https"}://${host}`;
  return {
    icons: { icon: '/favicon.svg' },
    title: "TLK HTML Viewer — Fikirden ekrana",
    description:
      "HTML, CSS ve JavaScript için kişisel çalışma alanın. Canlı önizleme, gelişmiş editör ve yerel proje dosyaları.",
    openGraph: {
      title: "TLK HTML Viewer",
      description: "Fikirden ekrana.",
      images: [`${origin}/og.png`],
    },
    twitter: {
      card: "summary_large_image",
      title: "TLK HTML Viewer",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
