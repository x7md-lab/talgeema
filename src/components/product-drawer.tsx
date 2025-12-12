import {
  Drawer,
  DrawerClose,
  DrawerContent,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import type { Product as ApiProduct } from "@/types/menu";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  originalProduct?: ApiProduct;
}

interface ProductDrawerProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductDrawer({ product, open, onOpenChange }: ProductDrawerProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToOrder = () => {
    if (product) {
      // In a real app, we would gather selected options here and pass them to addItem
      // For now, we just add the base product
      addItem(product, quantity);
      setQuantity(1); // Reset quantity
      onOpenChange(false); // Close drawer
    }
  };

  if (!product) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] h-full sm:h-auto rounded-t-3xl outline-none">
        {/* Custom Header with Close Button */}
        <div className="relative z-20 bg-surface-light dark:bg-surface-dark/90 backdrop-blur-md pt-3 pb-2 px-5 flex justify-between items-center shrink-0 border-b border-gray-100 dark:border-white/5">
          <div className="w-10"></div>
          <DrawerClose>
            <button
              aria-label="Close modal"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 dark:bg-white/10 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/20 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl font-bold">✕</span>
            </button>
          </DrawerClose>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar relative bg-surface-light dark:bg-background-dark pb-32">
          {/* Product Image & Info */}
          <div className="px-5 pt-2 pb-6">
            <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-lg group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${product.image}')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-5 w-full">
                <div className="flex justify-between items-end">
                  <h1 className="text-white text-3xl font-bold leading-tight drop-shadow-sm">
                    {product.name}
                  </h1>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-start gap-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">
                وصف للمنتج يوضع هنا. مكونات طازجة ومذاق رائع.
              </p>
              <span className="shrink-0 text-xl font-bold text-primary">
                {product.price.toFixed(2)} ريال
              </span>
            </div>
          </div>

          <div className="h-2 w-full bg-gray-100 dark:bg-surface-dark"></div>

          {/* Dynamic Options */}
          {product.originalProduct?.options.map((option) => (
            <div key={option.id} className="px-5 py-6 border-b border-gray-100 dark:border-white/5 last:border-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 dark:text-white text-lg font-bold">{option.name}</h3>
                <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide ${
                  option.required 
                    ? "bg-primary/10 text-primary" 
                    : "text-gray-400"
                }`}>
                  {option.required ? "مطلوب" : "اختياري"}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {option.values.map((val) => (
                  <label key={val.id} className="group relative flex items-center gap-4 rounded-xl border border-gray-200 dark:border-white/10 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-surface-dark/50 transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5 dark:has-[:checked]:bg-primary/10">
                    <input
                      className={`peer h-5 w-5 appearance-none border-2 border-gray-300 dark:border-gray-500 ${option.allow_multiple ? 'rounded-md' : 'rounded-full'} bg-transparent checked:border-primary checked:bg-primary focus:outline-none focus:ring-0 transition-all`}
                      name={option.key} // Using key for grouping radios
                      type={option.allow_multiple ? "checkbox" : "radio"}
                      value={val.value}
                    />
                    <div className="flex grow justify-between items-center">
                      <span className="text-gray-900 dark:text-white font-semibold text-sm peer-checked:text-primary">
                        {val.name}
                      </span>
                      {val.price > 0 && (
                        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                          +{val.price} ريال
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="px-5 pb-8 pt-6">
            <h3 className="text-gray-900 dark:text-white text-lg font-bold mb-3">
              ملاحظات خاصة
            </h3>
            <div className="relative">
              <textarea
                className="w-full bg-gray-50 dark:bg-surface-dark border border-gray-200 dark:border-white/10 rounded-2xl p-4 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                placeholder="مثلاً: بدون سكر، الصلصة على الجانب..."
                rows={3}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 w-full z-30 bg-surface-light dark:bg-background-dark border-t border-gray-100 dark:border-white/5 px-5 py-4 pb-8 sm:pb-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-between gap-1 bg-gray-100 dark:bg-surface-dark rounded-full p-1.5 h-[56px] min-w-[130px]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center text-gray-900 dark:text-white hover:text-primary active:scale-95 transition-all cursor-pointer"
              >
                <span className="text-xl font-bold">-</span>
              </button>
              <span className="text-lg font-bold text-gray-900 dark:text-white w-6 text-center tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center text-gray-900 dark:text-white hover:text-primary active:scale-95 transition-all cursor-pointer"
              >
                <span className="text-xl font-bold">+</span>
              </button>
            </div>
            <Button 
              onClick={handleAddToOrder}
              className="flex-1 h-[56px] rounded-full text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 active:scale-[0.98] transition-all"
            >
              إضافة {(product.price * quantity).toFixed(2)} ريال
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
