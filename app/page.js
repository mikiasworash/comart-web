import FeaturedProductsListComponent from "./components/products/featuredProductsList";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="px-4 pt-4">
      <Hero />
      <FeaturedProductsListComponent />
    </div>
  );
}
