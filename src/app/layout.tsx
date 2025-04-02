import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Portfolio | Creative Developer',
  description: 'A showcase of my creative work and professional projects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white">
        {children}
      </body>
    </html>
  );
}