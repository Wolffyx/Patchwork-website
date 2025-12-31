import { ThemeToggle } from "@/components/ui/theme-toggle";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="flex justify-end p-4">
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">Patchwork</h1>
          <p className="mt-4 text-muted-foreground">Website coming soon...</p>
        </div>
      </main>
    </div>
  );
}

export default App;
