import Hero from "@/components/hero";
import CategoryFilter from "@/components/category-filter";
import MenuSection from "@/components/menu-section";
import CheckoutFloating from "@/components/checkout-floating";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Hero />
      <CategoryFilter />
      <MenuSection />
      <CheckoutFloating />
    </div>
  );
}
