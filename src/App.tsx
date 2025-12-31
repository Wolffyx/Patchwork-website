import { ThemeToggle } from "@/components/ui/theme-toggle";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border/50 bg-background/80 px-4 py-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 sm:px-6 lg:px-8 sm:py-4">
        <div className="text-lg font-semibold tracking-tight text-foreground select-none sm:text-xl">
          <span className="text-primary">Patch</span>work
        </div>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-3xl text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-primary">Patch</span>work
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:mt-8 sm:text-xl md:text-2xl max-w-2xl mx-auto">
            Website coming soon...
          </p>
          <div className="mt-10 sm:mt-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent-foreground ring-1 ring-accent/30">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
              </span>
              Under Development
            </span>
          </div>
        </div>
      </main>
      <footer className="border-t border-border/50 bg-muted/30 px-4 py-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8 sm:py-5">
        <p>&copy; {new Date().getFullYear()} Patchwork. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
