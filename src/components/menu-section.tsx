import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProductDrawer from "@/components/product-drawer";

const menuItems = [
  {
    id: 1,
    name: "شاي تلقيمة",
    price: 4.00,
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "شاي كرك",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1921&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "قهوة سعودية",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "قهوة سوداء",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "قهوة كريمر",
    price: 6.00,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b5dd7359?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "مشروبات الطبيعة",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1887&auto=format&fit=crop"
  },
];

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function MenuSection() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddToCart = (item: Product) => {
    setSelectedProduct(item);
    setIsDrawerOpen(true);
  };

  return (
    <section className="container mx-auto px-4 py-8 max-w-4xl scroll-mt-32" id="menu-section">
      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="h-1 bg-primary/20 flex-1 rounded-full"></div>
          <h2 className="text-2xl font-bold mx-4 text-primary">المشروبات الساخنة</h2>
          <div className="h-1 bg-primary/20 flex-1 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <h3 className="sr-only" id="menu-section-title">
            القائمة
          </h3>
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-surface-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex h-full gap-4 items-center">
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold text-primary dark:text-white">{item.name}</h3>
                  <div className="mt-2">
                    <span className="bg-primary/10 text-primary dark:text-primary-foreground px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1.5">
                      <span>{item.price.toFixed(2)}</span>
                      <span className="text-xs">ريال</span>
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={() => handleAddToCart(item)}
                  className="max-w-[145px] mt-4 w-full bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-200 text-sm active:scale-95"
                >
                  إضافة للسلة
                </Button>
              </div>
              <div className="w-24 h-24 flex-shrink-0">
                <img 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded-lg" 
                  src={item.image} 
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <ProductDrawer 
        product={selectedProduct} 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
      />
    </section>
  );
}
