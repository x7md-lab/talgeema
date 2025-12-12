import Hero from "@/components/hero";
import CategoryFilter from "@/components/category-filter";
import MenuSection from "@/components/menu-section";
import CheckoutFloating from "@/components/checkout-floating";
import { useEffect } from "react";
import { useMenuStore } from "@/store/useMenuStore";

export default function Home() {
  const fetchMenu = useMenuStore((state) => state.fetchMenu);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return (
    <div className="container mx-auto">
      <Hero />
      <CategoryFilter />
      <MenuSection />
      <CheckoutFloating />
    </div>
  );
}
