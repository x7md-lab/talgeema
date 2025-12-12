import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMenuStore } from "@/store/useMenuStore";

export default function CategoryFilter() {
  const { categories } = useMenuStore();

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (categories.length === 0) return null;

  return (
    <div className="sticky top-[72px] z-40 bg-background-light dark:bg-background-dark py-2 border-b border-transparent transition-all duration-300" id="category-bar">
      <div className="relative w-full">
        <Tabs defaultValue={categories[0]?.id.toString()} className="w-full">
          <TabsList className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-4 pt-1 scroll-smooth bg-transparent w-full justify-start h-auto [&_span[data-slot=tab-indicator]]:hidden">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id.toString()}
                onClick={() => handleScroll(`category-${category.id}`)}
                className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 text-sm font-semibold transition-transform active:scale-95 
                data-[selected]:bg-primary data-[selected]:text-white data-[selected]:shadow-md data-[selected]:shadow-primary/20 
                bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 shadow-sm 
                hover:bg-gray-50 dark:hover:bg-gray-700 
                text-text-main dark:text-gray-200 cursor-pointer"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
