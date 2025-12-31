import { ThemeToggle } from "@/components/ui/theme-toggle";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border/40 bg-background/95 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="text-lg font-semibold tracking-tight text-foreground">
          Patchwork
        </div>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Patchwork
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Website coming soon...
          </p>
        </div>
      </main>
      <footer className="border-t border-border/40 px-6 py-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Patchwork. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
