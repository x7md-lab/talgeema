import {
  Drawer,
  DrawerClose,
  DrawerContent,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import type { Product as ApiProduct } from "@/types/menu";
import { useForm, useWatch, Controller } from "react-hook-form";
import { X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  originalProduct?: ApiProduct;
}

interface FormValues {
  quantity: number;
  options: Record<string, string | string[]>; // optionId -> valueId or array of valueIds
  notes: string;
}

export default function ProductDrawer() {
  const { 
    isProductDrawerOpen, 
    closeProductDrawer, 
    selectedProduct, 
    editingCartItem 
  } = useUIStore();

  if (!selectedProduct) return null;

  return (
    <Drawer open={isProductDrawerOpen} onOpenChange={(open) => !open && closeProductDrawer()}>
      <DrawerContent className="max-h-[90vh] h-full sm:h-auto rounded-t-[32px] outline-none flex flex-col bg-background-light dark:bg-background-dark">
        {/* Header */}
        <div className="flex-none bg-surface-light dark:bg-surface-dark/90 backdrop-blur-md pb-4 pt-3 px-6 border-b border-gray-100 dark:border-white/5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          {/* Handle */}
          <div className="mx-auto w-12 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full mb-5" />
          
          <div className="flex items-center justify-between">
            {/* Title */}
            <div className="flex-1 flex flex-col justify-center">
               <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-none">
                 {editingCartItem ? "تعديل الطلب" : "تفاصيل المنتج"}
               </h2>
            </div>

            {/* Close Button */}
            <DrawerClose
              aria-label="Close modal"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 dark:bg-white/10 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 font-bold" />
            </DrawerClose>
          </div>
        </div>

        <ProductForm 
          key={editingCartItem ? `edit-${editingCartItem.cartId}` : selectedProduct.id} 
          product={selectedProduct} 
          editItem={editingCartItem}
          onClose={closeProductDrawer} 
        />
      </DrawerContent>
    </Drawer>
  );
}

function ProductForm({ product, editItem, onClose }: { product: Product; editItem?: any; onClose: () => void }) {
  const { addItem, removeItem } = useCartStore();

  const { register, control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      quantity: editItem ? editItem.quantity : 1,
      options: editItem ? editItem.selectedOptions : {},
      notes: editItem ? editItem.notes : ""
    }
  });

  const quantity = useWatch({ control, name: "quantity" });
  const selectedOptions = useWatch({ control, name: "options" }) || {};

  // Calculate unit price based on selected options
  const calculateUnitPrice = () => {
    let total = product.price;

    // Iterate through selected options to add their prices
    if (product.originalProduct?.options) {
      Object.entries(selectedOptions).forEach(([optionId, selection]) => {
        const option = product.originalProduct?.options.find(opt => opt.id === optionId);
        if (!option) return;

        const values = Array.isArray(selection) ? selection : [selection];
        values.forEach(valId => {
          if (!valId) return; // Skip null/undefined/empty string
          const value = option.values.find(v => v.id === valId);
          if (value && value.price) {
            total += value.price;
          }
        });
      });
    }

    return total;
  };

  const calculateTotalPrice = () => {
    return calculateUnitPrice() * quantity;
  };

  const getSelectedOptionsText = () => {
    const texts: string[] = [];
    if (product.originalProduct?.options) {
      Object.entries(selectedOptions).forEach(([optionId, selection]) => {
        const option = product.originalProduct?.options.find(opt => opt.id === optionId);
        if (!option) return;

        const values = Array.isArray(selection) ? selection : [selection];
        values.forEach(valId => {
          if (!valId) return;
          const value = option.values.find(v => v.id === valId);
          if (value) {
            // e.g. "Size: Large" or just "Large" depending on preference. 
            // Let's use "OptionName: ValueName" for clarity
            texts.push(`${option.name}: ${value.name}`);
          }
        });
      });
    }
    return texts;
  };

  const onSubmit = (data: FormValues) => {
    if (product) {
      if (editItem) {
        removeItem(editItem.cartId);
      }
      
      addItem(product, data.quantity, {
        options: data.options,
        selectedOptionsText: getSelectedOptionsText(),
        notes: data.notes,
        unitPrice: calculateUnitPrice()
      });
      onClose();
    }
  };

  return (
    <>
      <ScrollArea
        className="flex-1 relative bg-surface-light dark:bg-background-dark"
        viewportClassName="overscroll-y-none"
      >
        <div className="pb-32">
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
                <Controller
                  control={control}
                  name={`options.${option.id}`}
                  rules={{ required: option.required }}
                  render={({ field }) => (
                    <>
                      {option.values.map((val) => {
                        const isSelected = option.allow_multiple
                          ? Array.isArray(field.value) && field.value.includes(val.id)
                          : field.value === val.id;

                        return (
                          <Toggle
                            key={val.id}
                            pressed={isSelected}
                            onPressedChange={(pressed) => {
                              if (option.allow_multiple) {
                                const current = Array.isArray(field.value) ? field.value : [];
                                if (pressed) {
                                  field.onChange([...current, val.id]);
                                } else {
                                  field.onChange(current.filter((id: string) => id !== val.id));
                                }
                              } else {
                                // Single select (Radio)
                                if (pressed) {
                                  field.onChange(val.id);
                                } else {
                                  // Trying to uncheck
                                  if (!option.required) {
                                    field.onChange("");
                                  }
                                }
                              }
                            }}
                            variant="outline"
                            className="w-full h-auto justify-between p-4 rounded-xl border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-surface-dark/50 hover:text-inherit data-[pressed]:border-primary data-[pressed]:bg-primary/5 dark:data-[pressed]:bg-primary/10 data-[pressed]:text-inherit shadow-none"
                          >
                            <div className="flex items-center gap-4 w-full">
                              {/* Custom Checkbox/Radio Indicator */}
                              <div className={`flex items-center justify-center w-5 h-5 border-2 transition-all shrink-0 ${
                                option.allow_multiple ? 'rounded-md' : 'rounded-full'
                              } ${
                                isSelected 
                                  ? 'border-primary bg-primary' 
                                  : 'border-gray-300 dark:border-gray-500 bg-transparent'
                              }`}>
                                {isSelected && (
                                  option.allow_multiple ? (
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  ) : (
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                  )
                                )}
                              </div>

                              <div className="flex grow justify-between items-center text-left">
                                <span className={`font-semibold text-sm ${isSelected ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>
                                  {val.name}
                                </span>
                                {val.price > 0 && (
                                  <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                    +{val.price} ريال
                                  </span>
                                )}
                              </div>
                            </div>
                          </Toggle>
                        );
                      })}
                    </>
                  )}
                />
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
                {...register("notes")}
              ></textarea>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="absolute bottom-0 left-0 w-full z-30 bg-surface-light dark:bg-background-dark border-t border-gray-100 dark:border-white/5 px-5 py-4 pb-8 sm:pb-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-between gap-1 bg-gray-100 dark:bg-surface-dark rounded-full p-1.5 h-[56px] min-w-[130px]">
            <button
              onClick={() => setValue("quantity", Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center text-gray-900 dark:text-white hover:text-primary active:scale-95 transition-all cursor-pointer"
            >
              <span className="text-xl font-bold">-</span>
            </button>
            <span className="text-lg font-bold text-gray-900 dark:text-white w-6 text-center tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setValue("quantity", quantity + 1)}
              className="w-10 h-10 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center text-gray-900 dark:text-white hover:text-primary active:scale-95 transition-all cursor-pointer"
            >
              <span className="text-xl font-bold">+</span>
            </button>
          </div>
          <Button 
            onClick={handleSubmit(onSubmit)}
            className="flex-1 h-[56px] rounded-full text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 active:scale-[0.98] transition-all"
          >
            {editItem ? "تحديث" : "إضافة"} {calculateTotalPrice().toFixed(2)} ريال
          </Button>
        </div>
      </div>
    </>
  );
}
