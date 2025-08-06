// src/app/page.jsx
import Navbar from '../components/navBar';
import Hero from '../components/hero';
import Categories from '../components/categories';
import Offers from '../components/offers';
import PopularPastas from '../components/popularPastas';
import Footer from '../components/footer';
import CarouselScript from '../components/carrouselScript';

export default function Home() {
  const categories = [
    { name: 'Pasta', image: '/img/menus/menu1.png' },
    { name: 'Pizzas', image: '/img/menus/menu2.png' },
    { name: 'Risottos', image: '/img/menus/menu3.png' },
    { name: 'Desserts', image: '/img/menus/menu4.png' },
    { name: 'Appetizers', image: '/img/menus/menu5.png' },
    { name: 'Wines', image: '/img/menus/menu6.png' },
  ];

  return (
    <div>
      <Navbar />
      <Hero />
      <Categories categories={categories} />
      <Offers />
      <PopularPastas />
      <Footer />
      <CarouselScript />
    </div>
  );
}