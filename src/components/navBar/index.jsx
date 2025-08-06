// src/components/Navbar.jsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="container mx-auto px-4 py-6 flex justify-center flex-col items-center">
      <div className="flex justify-between items-center">
        <button className="text-gray-600">
          <h1 className="text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            Aglio & Pasta
          </h1>
        </button>
      </div>
      <div className="flex justify-center space-x-8 mt-6">
        <Link href="/" className="text-gray-600 hover:text-gray-900">Home Page</Link>
        <Link href="/categories" className="text-gray-600 hover:text-gray-900">Categories</Link>
        <Link href="#" className="text-gray-600 hover:text-gray-900">Products</Link>
        <Link href="#" className="text-gray-600 hover:text-gray-900">About us</Link>
      </div>
    </nav>
  );
};

export default Navbar;