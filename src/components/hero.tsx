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
        data-alt="Pouring authentic tea into a glass" 
        style={{ backgroundImage: 'url("./mint-tea-into-a-glass.jpg")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 flex flex-col gap-3 text-center w-full items-center">
          <div className="inline-flex self-center items-center justify-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-1">
            <span className="text-white text-xs font-bold tracking-wider uppercase">شاي وكرك</span>
          </div>
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
            تلقيمة <span className="text-blue-300">تعدل المزاج</span>
          </h1>
          <p className="text-gray-200 text-sm font-medium leading-relaxed max-w-[280px] mx-auto">
            استمتع بألذ كوب شاي في أي وقت، طعم الأصالة في كل رشفة.
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
