import { DownloadSection } from "@/components/DownloadSection";
import { FeaturesShowcase } from "@/components/FeaturesShowcase";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { WorkflowSection } from "@/components/WorkflowSection";
import {
  TestimonialsSection,
  UseCasesSection,
} from "@/components";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Workflow Demonstration Section */}
        <section
          id="workflow"
          className="border-t border-border scroll-mt-16"
        >
          <WorkflowSection />
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

        {/* Use Cases Section */}
        <section
          id="use-cases"
          className="py-20 border-t border-border scroll-mt-16"
        >
          <UseCasesSection />
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-20 border-t border-border scroll-mt-16"
        >
          <TestimonialsSection />
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
