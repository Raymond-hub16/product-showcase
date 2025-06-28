import './globals.css'; // This imports your Tailwind CSS styles
import Link from 'next/link';

export const metadata = {
  title: 'Product Showcase App',
  description: 'A simple product showcase built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-800 p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-2xl font-bold hover:text-gray-300 transition-colors duration-300">
              Product Showcase
            </Link>
            <div className="flex space-x-6">
              <Link href="/" className="text-white hover:text-gray-300 transition-colors duration-300 text-lg">
                Home
              </Link>
              <Link href="/contact" className="text-white hover:text-gray-300 transition-colors duration-300 text-lg">
                Contact
              </Link>
            </div>
          </div>
        </nav>
        <main className="min-h-[calc(100vh-64px)]">{children}</main> {/* Adjust min-height based on nav height */}
      </body>
    </html>
  );
}