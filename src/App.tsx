import { ThemeToggle } from "@/components/ui/theme-toggle";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border/40 bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6 sm:py-4">
        <div className="text-lg font-semibold tracking-tight text-foreground select-none">
          Patchwork
        </div>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
        <div className="max-w-2xl text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Patchwork
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg md:text-xl">
            Website coming soon...
          </p>
        </div>
      </main>
      <footer className="border-t border-border/40 px-4 py-3 text-center text-sm text-muted-foreground sm:px-6 sm:py-4">
        <p>&copy; {new Date().getFullYear()} Patchwork. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
