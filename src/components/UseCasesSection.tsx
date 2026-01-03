import { cn } from "@/lib/utils";
import { User, Users, Globe } from "lucide-react";

interface UseCase {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const useCases: UseCase[] = [
  {
    icon: <User className="h-8 w-8" />,
    title: "Solo Developer",
    description:
      "Get AI-powered code reviews without the need for a team. Perfect for indie hackers and freelancers.",
    features: [
      "24/7 automated reviews",
      "Catch bugs before production",
      "Learn best practices",
      "No team required",
    ],
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Small Team",
    description:
      "Accelerate your team's velocity with automated first-pass reviews. Ship faster with confidence.",
    features: [
      "Reduce review bottlenecks",
      "Consistent code standards",
      "Faster PR turnaround",
      "Team analytics",
    ],
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Open Source",
    description:
      "Manage contributor PRs at scale. Maintain quality while welcoming new contributors.",
    features: [
      "Auto-review external PRs",
      "Contributor guidance",
      "Scale maintainer time",
      "Community-friendly",
    ],
  },
];

interface UseCaseCardProps {
  useCase: UseCase;
  className?: string;
}

function UseCaseCard({ useCase, className }: UseCaseCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {useCase.icon}
      </div>
      <h3 className="mt-4 text-xl font-semibold text-card-foreground">
        {useCase.title}
      </h3>
      <p className="mt-2 flex-1 text-muted-foreground">{useCase.description}</p>
      <ul className="mt-4 space-y-2">
        {useCase.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-sm text-card-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function UseCasesSection() {
  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for every workflow
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether you're working solo or managing a team, Patchwork adapts to
            your needs
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((useCase) => (
            <UseCaseCard key={useCase.title} useCase={useCase} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default UseCasesSection;
