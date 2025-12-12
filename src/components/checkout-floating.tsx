import { useCartStore } from "@/store/useCartStore";
import { cn } from "@/lib/utils";

export default function CheckoutFloating() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 px-4 z-50 flex justify-center pointer-events-none">
      <button 
        className={cn(
          "w-full max-w-md flex items-center justify-between bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-xl shadow-green-600/30 transition-all active:scale-[0.98] cursor-pointer pointer-events-auto",
          "animate-in slide-in-from-bottom-4 duration-300"
        )}
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-full p-1.5 backdrop-blur-sm min-w-[32px] min-h-[32px] flex items-center justify-center">
            <span className="text-sm font-bold">{totalItems}</span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-bold leading-none">إتمام الطلب</span>
            <span className="text-[10px] text-green-100 font-medium">عبر واتساب</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">{totalPrice.toFixed(2)} ريال</span>
          <span className="material-symbols-outlined rtl:rotate-180">arrow_forward</span>
        </div>
      </button>
    </div>
  );
}
