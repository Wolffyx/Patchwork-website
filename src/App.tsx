import { DownloadSection } from "@/components/DownloadSection";
import { FeaturesShowcase } from "@/components/FeaturesShowcase";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              Patchwork
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Website coming soon...
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-20 border-t border-border scroll-mt-16"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center">
              Features
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
                 <FeaturesShowcase />
            </p>
          </div>
        </section>

        {/* Docs Section */}
        <section id="docs" className="py-20 border-t border-border scroll-mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground text-center">
              Documentation
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">
              Learn how to get started with Patchwork.
            </p>
          </div>
        </section>

        {/* Download Section */}
        <section
          id="download"
          className="border-t border-border scroll-mt-16"
        >
          <DownloadSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
