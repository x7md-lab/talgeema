import { Button } from "@/components/ui/button";
import { useMenuStore } from "@/store/useMenuStore";
import { useUIStore } from "@/store/useUIStore";
import type { Product as ApiProduct } from "@/types/menu";

export default function MenuSection() {
  const { categories, isLoading, error } = useMenuStore();
  const { openProductDrawer } = useUIStore();

  const handleAddToCart = (item: ApiProduct) => {
    openProductDrawer({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      image: item.imageSrc,
      originalProduct: item
    });
  };

  if (isLoading) return <div className="text-center py-10">جاري التحميل...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl" id="menu-section">
      {categories.map((category) => (
        <section key={category.id} className="mb-12 scroll-mt-32" id={`category-${category.id}`}>
          <div className="flex items-center mb-6">
            <div className="h-1 bg-primary/20 flex-1 rounded-full"></div>
            <h2 className="text-2xl font-bold mx-4 text-primary">{category.name}</h2>
            <div className="h-1 bg-primary/20 flex-1 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <h3 className="sr-only">
              {category.name}
            </h3>
            {category.items.map((item) => (
              <div key={item.id} className="bg-white dark:bg-surface-dark p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex h-full gap-4 items-center">
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-semibold text-primary dark:text-white">{item.name}</h3>
                    <div className="mt-2">
                      <span className="bg-primary/10 text-primary dark:text-primary-foreground px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1.5">
                        <span>{parseFloat(item.price).toFixed(2)}</span>
                        <span className="text-xs">ريال</span>
                      </span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleAddToCart(item)}
                    className="max-w-[145px] mt-4 w-full bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-200 text-sm active:scale-95 cursor-pointer"
                  >
                    إضافة للسلة
                  </Button>
                </div>
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    alt={item.name} 
                    className="w-full h-full object-cover rounded-lg" 
                    src={item.imageSrc} 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
