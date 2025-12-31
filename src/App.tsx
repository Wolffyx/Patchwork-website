import {
  TestimonialsSection,
  UseCasesSection,
  LogosSection,
  IntegrationBadges,
} from "@/components";

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16">
        <h1 className="text-center text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
          Patchwork
        </h1>
        <p className="mt-4 max-w-2xl text-center text-lg text-muted-foreground">
          AI-powered code reviews that help you ship better software, faster.
        </p>
      </section>

      {/* Integration Badges */}
      <IntegrationBadges />

      {/* Logos Section */}
      <LogosSection />

      {/* Use Cases Section */}
      <UseCasesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
}

export default App;
