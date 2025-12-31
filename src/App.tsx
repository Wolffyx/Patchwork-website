import { DownloadSection } from "@/components/DownloadSection";

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-foreground">Patchwork</h1>
          <p className="mt-4 text-muted-foreground">Your workflow, reimagined</p>
        </div>
      </header>

      {/* Download Section */}
      <DownloadSection />
    </div>
  );
}

export default App;
