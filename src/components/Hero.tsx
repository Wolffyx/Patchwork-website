import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

export function Hero({ className }: HeroProps) {
  return (
    <section
      className={cn(
        "min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8",
        className
      )}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Your Kanban Board,{" "}
          <span className="text-primary">Synced with Git</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg text-muted-foreground sm:text-xl md:text-2xl max-w-2xl mx-auto">
          Seamlessly integrate your project management with GitHub and GitLab.
          Track issues, manage tasks, and keep your workflow in sync with your
          repositories.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#download"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors w-full sm:w-auto"
          >
            Download Now
          </a>
          <a
            href="#learn-more"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors w-full sm:w-auto"
          >
            Learn More
          </a>
        </div>

        {/* Hero Image/Demo Placeholder */}
        <div className="mt-16 relative">
          <div className="aspect-video max-w-3xl mx-auto rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
            {/* Animated Kanban Board Demo */}
            <div className="w-full h-full p-4 sm:p-6">
              <div className="grid grid-cols-3 gap-2 sm:gap-4 h-full">
                {/* To Do Column */}
                <div className="flex flex-col">
                  <div className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2 sm:mb-3">
                    To Do
                  </div>
                  <div className="flex-1 space-y-2 sm:space-y-3">
                    <KanbanCard title="Feature request" color="bg-chart-1" />
                    <KanbanCard title="Bug fix #42" color="bg-chart-2" />
                  </div>
                </div>

                {/* In Progress Column */}
                <div className="flex flex-col">
                  <div className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2 sm:mb-3">
                    In Progress
                  </div>
                  <div className="flex-1 space-y-2 sm:space-y-3">
                    <KanbanCard
                      title="API integration"
                      color="bg-chart-3"
                      synced
                    />
                  </div>
                </div>

                {/* Done Column */}
                <div className="flex flex-col">
                  <div className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2 sm:mb-3">
                    Done
                  </div>
                  <div className="flex-1 space-y-2 sm:space-y-3">
                    <KanbanCard title="Setup CI/CD" color="bg-chart-4" synced />
                    <KanbanCard
                      title="Documentation"
                      color="bg-chart-5"
                      synced
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}

interface KanbanCardProps {
  title: string;
  color: string;
  synced?: boolean;
}

function KanbanCard({ title, color, synced }: KanbanCardProps) {
  return (
    <div className="p-2 sm:p-3 rounded-md bg-background border border-border shadow-sm">
      <div className={cn("w-full h-1 rounded-full mb-2", color)} />
      <div className="text-xs sm:text-sm font-medium text-foreground truncate">
        {title}
      </div>
      {synced && (
        <div className="mt-1 flex items-center gap-1">
          <GitSyncIcon className="w-3 h-3 text-chart-2" />
          <span className="text-[10px] sm:text-xs text-muted-foreground">
            Synced
          </span>
        </div>
      )}
    </div>
  );
}

function GitSyncIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v6" />
      <path d="M12 15v6" />
      <path d="M3 12h6" />
      <path d="M15 12h6" />
    </svg>
  );
}

export default Hero;
