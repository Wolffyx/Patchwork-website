import { WorkflowSection } from "@/components/WorkflowSection";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="py-6 px-4 md:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-foreground">Patchwork</h1>
        </div>
      </header>
      <main>
        <WorkflowSection />
      </main>
    </div>
  );
}

export default App;
