import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCP Next.js Server",
  description: "Model Context Protocol server built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
