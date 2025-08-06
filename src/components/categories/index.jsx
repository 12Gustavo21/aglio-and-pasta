import Link from 'next/link';
import Image from 'next/image';
import categoriesData from '../../data/categories';

const Categories = () => {
  const categories = categoriesData.slice(0, 6);

  return (
    <section className="container mx-auto px-6 my-8 md:my-12">
      <h2 className="text-4xl font-bold text-left text-gray-800 mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>
        Popular Categories
      </h2>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8">
        {categories.map((category, index) => (
          <Link href="/categories" key={index} className="group block text-center" data-aos="fade-up">
            <figure>
              <div className="relative w-24 h-24 md:w-40 md:h-40 mx-auto">
                <Image 
                  src={category.imagePath} 
                  alt={category.name}
                  width={160}
                  height={160}
                  className="rounded-full shadow-md transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <figcaption className="mt-4">
                <span className="font-semibold text-gray-700 transition-colors group-hover:text-red-600">
                  {category.name}
                </span>
              </figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;