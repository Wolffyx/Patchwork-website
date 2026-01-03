import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Patchwork has transformed how our team handles code reviews. The AI-powered suggestions save us hours every week.",
    author: "Sarah Chen",
    role: "Engineering Lead",
    company: "TechStart Inc.",
  },
  {
    quote:
      "As a solo developer, Patchwork is like having a senior engineer review my code 24/7. It catches issues I would have missed.",
    author: "Marcus Johnson",
    role: "Indie Developer",
    company: "Freelance",
  },
  {
    quote:
      "We integrated Patchwork into our open source project and contributor PRs are now processed 3x faster.",
    author: "Elena Rodriguez",
    role: "Maintainer",
    company: "OpenCore Project",
  },
];

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm",
        className
      )}
    >
      <blockquote className="flex-1">
        <p className="text-lg leading-relaxed text-card-foreground">
          "{testimonial.quote}"
        </p>
      </blockquote>
      <div className="mt-6 flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {testimonial.author.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-card-foreground">
            {testimonial.author}
          </p>
          <p className="text-sm text-muted-foreground">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by developers everywhere
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what teams are saying about Patchwork
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.author}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
