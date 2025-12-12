import {
  Drawer,
  DrawerClose,
  DrawerContent,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import { X, ShoppingCart, FilePenLine, Pencil, ArrowRight } from "lucide-react";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const { openProductDrawer } = useUIStore();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handleCheckout = () => {
    // Generate WhatsApp message
    let message = "مرحباً، أرغب بطلب جديد 📋:\n\n";
    items.forEach(item => {
      message += `▪️ *${item.quantity}x ${item.name}*\n`;
      if (item.selectedOptionsText && item.selectedOptionsText.length > 0) {
          item.selectedOptionsText.forEach(opt => {
              message += `   ▫️ ${opt}\n`;
          });
      }
      if (item.notes) {
        message += `   📝 ${item.notes}\n`;
      }
      message += "\n";
    });
    message += `💰 *الإجمالي: ${totalPrice.toFixed(2)} ريال*`;

    const url = `https://wa.me/966575909700?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh] h-full sm:h-auto rounded-t-[32px] outline-none flex flex-col bg-background-light dark:bg-background-dark">
        {/* Header */}
        <div className="flex-none bg-surface-light dark:bg-surface-dark/90 backdrop-blur-md pb-4 pt-3 px-6 border-b border-gray-100 dark:border-white/5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          {/* Handle */}
          <div className="mx-auto w-12 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full mb-5" />
          
          <div className="flex items-center justify-between">
            {/* Title & Count - Centered Logic */}
            <div className="flex-1 flex flex-col justify-center">
               <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-none">سلة المشتريات</h2>
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 font-medium">{totalItems} منتجات</p>
            </div>

            {/* Close Button - Trailing */}
            <DrawerClose
              aria-label="Close cart"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-50 dark:bg-white/10 text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 font-bold" />
            </DrawerClose>
          </div>
        </div>

        <ScrollArea className="flex-1 relative" viewportClassName="overscroll-y-none">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-20 text-center px-4 animate-in fade-in duration-500">
              <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
                <ShoppingCart className="w-12 h-12 text-gray-300 dark:text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">السلة فارغة</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-[250px] leading-relaxed">لم تقم بإضافة أي منتجات للسلة بعد. تصفح القائمة واختر ما يعجبك!</p>
              <Button 
                onClick={() => onOpenChange(false)}
                className="mt-8 rounded-full px-8 h-12 font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                تصفح القائمة
              </Button>
            </div>
          ) : (
            <div className="p-5 flex flex-col gap-4 pb-48">
               {items.map((item) => (
                 <div key={item.cartId} className="group flex gap-4 bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 transition-all hover:shadow-md hover:border-primary/20">
                   {/* Image */}
                   <div className="w-24 h-24 shrink-0 rounded-xl bg-gray-100 dark:bg-white/5 overflow-hidden relative">
                     <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                   </div>
                   
                   {/* Content */}
                   <div className="flex-1 flex flex-col justify-between py-0.5">
                     <div className="flex justify-between items-start gap-2">
                       <div className="flex-1">
                         <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight mb-1">{item.name}</h3>
                         {item.selectedOptionsText && item.selectedOptionsText.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-2">
                                {item.selectedOptionsText.map((opt, idx) => (
                                    <span key={idx} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                                      {opt}
                                    </span>
                                ))}
                            </div>
                         )}
                         {item.notes && (
                            <div className="flex items-start gap-1.5 mt-1.5 text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-lg w-fit">
                              <FilePenLine className="w-3.5 h-3.5" />
                              <span className="line-clamp-1">{item.notes}</span>
                            </div>
                         )}
                       </div>
                       <button 
                         onClick={() => openProductDrawer(item.originalProduct || item, item)}
                         className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-primary hover:bg-primary/10 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                         aria-label="Edit item"
                       >
                         <Pencil className="w-5 h-5" />
                       </button>
                     </div>

                     <div className="flex justify-between items-end mt-3">
                       <div className="flex items-center gap-1 bg-gray-50 dark:bg-white/5 rounded-full p-1 border border-gray-100 dark:border-white/5">
                         <button 
                           onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                           className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-white/10 text-gray-700 dark:text-white shadow-sm hover:text-primary hover:scale-105 active:scale-95 transition-all"
                         >
                           <span className="text-lg font-bold leading-none mb-0.5">-</span>
                         </button>
                         <span className="text-sm font-bold w-6 text-center tabular-nums text-gray-900 dark:text-white">{item.quantity}</span>
                         <button 
                           onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                           className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-white/10 text-gray-700 dark:text-white shadow-sm hover:text-primary hover:scale-105 active:scale-95 transition-all"
                         >
                           <span className="text-lg font-bold leading-none mb-0.5">+</span>
                         </button>
                       </div>
                       <span className="font-bold text-lg text-primary">
                         {(item.price * item.quantity).toFixed(2)} <span className="text-xs font-normal text-gray-500">ريال</span>
                       </span>
                     </div>
                   </div>
                 </div>
               ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full z-30 bg-surface-light dark:bg-background-dark border-t border-gray-100 dark:border-white/5 px-5 py-4 pb-8 sm:pb-4 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center px-1">
                <span className="text-gray-500 dark:text-gray-400 font-medium">الإجمالي</span>
                <span className="text-xl font-bold text-gray-900 dark:text-white">{totalPrice.toFixed(2)} ريال</span>
              </div>
              <Button 
                onClick={handleCheckout}
                className="w-full h-[56px] rounded-full text-lg font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>إتمام الطلب عبر واتساب</span>
                <ArrowRight className="w-5 h-5 rtl:rotate-180" />
              </Button>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
