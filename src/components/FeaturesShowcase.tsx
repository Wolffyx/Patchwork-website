import { cn } from "@/lib/utils";
import {
  Kanban,
  GitMerge,
  Sparkles,
  PanelRightOpen,
  Command,
  Keyboard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

const features: FeatureCardProps[] = [
  {
    icon: Kanban,
    title: "Kanban Board",
    description:
      "Intuitive drag-and-drop columns to organize your workflow. Move cards between stages with ease and visualize your project progress at a glance.",
  },
  {
    icon: GitMerge,
    title: "GitHub & GitLab Sync",
    description:
      "Seamlessly sync your issues, pull requests, and repositories. Stay connected with your favorite version control platform in real-time.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Automation",
    description:
      "Let AI draft cards and automate repetitive tasks. Smart workers handle the mundane so you can focus on what matters most.",
  },
  {
    icon: PanelRightOpen,
    title: "PR/MR Side Rail",
    description:
      "Review pull requests and merge requests without leaving your board. The integrated side rail keeps context at your fingertips.",
  },
  {
    icon: Command,
    title: "Command Palette",
    description:
      "Access any action instantly with a powerful command palette. Navigate, create, and manage your work with lightning speed.",
  },
  {
    icon: Keyboard,
    title: "Keyboard Shortcuts",
    description:
      "Boost your productivity with comprehensive keyboard shortcuts. Every action is just a keystroke away for power users.",
  },
];

interface FeaturesShowcaseProps {
  className?: string;
}

export function FeaturesShowcase({ className }: FeaturesShowcaseProps) {
  return (
    <section
      className={cn(
        "px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32",
        className
      )}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Powerful Features
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Everything you need to manage your projects efficiently, all in one
            place.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
