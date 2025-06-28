// app/contact/page.tsx
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="container mx-auto p-6 text-center mt-10">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-8">
        This is a simple contact page for our product showcase app.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
      >
        &larr; Back to Home
      </Link>
    </div>
  );
}