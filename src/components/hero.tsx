import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu-section');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="p-4">
      <div 
        className="flex min-h-[180px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-end p-6 relative overflow-hidden shadow-lg group" 
        data-alt="Close up of a delicious gourmet burger with melting cheese and fresh toppings" 
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="relative z-10 flex flex-col gap-3 text-center w-full items-center">
          <div className="inline-flex self-center items-center justify-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-1">
            <span className="text-white text-xs font-bold tracking-wider uppercase">عربة طعام متنقلة</span>
          </div>
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            تذوق <span className="text-blue-300">طعم الشارع</span>
          </h1>
          <p className="text-gray-200 text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
            نكهات طعام الشارع الأصيلة تصل مباشرة إلى يديك.
          </p>
          <Button 
            className="mt-2 w-full max-w-xs cursor-pointer flex items-center justify-center rounded-full h-12 bg-primary text-primary-foreground text-base font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95" 
            onClick={scrollToMenu}
          >
            استكشف القائمة
          </Button>
        </div>
      </div>
    </header>
  );
}
