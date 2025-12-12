export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary dark:text-blue-300">
        {/* <span className="material-symbols-outlined">lunch_dining</span> */}
        </div>
        <h2 className="text-text-main dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Talgeema</h2>
        </div>
        <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-surface-dark shadow-sm text-text-main dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        {/* <span className="material-symbols-outlined">shopping_bag</span> */}
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white border-2 border-background-light dark:border-background-dark">2</span>
        </button>
    </nav>
  )
}