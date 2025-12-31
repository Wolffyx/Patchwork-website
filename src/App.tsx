import { AICapabilities } from "@/components/AICapabilities";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-foreground">Patchwork</h1>
        </div>
      </header>
      <main>
        <AICapabilities />
      </main>
    </div>
  );
}

export default App;
