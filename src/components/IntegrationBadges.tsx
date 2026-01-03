import { cn } from "@/lib/utils";

interface Integration {
  name: string;
  icon: React.ReactNode;
  status: "available" | "coming-soon";
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function GitLabIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0118.6 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51L23 13.45a.84.84 0 01-.35.94z" />
    </svg>
  );
}

const integrations: Integration[] = [
  {
    name: "GitHub",
    icon: <GitHubIcon className="h-5 w-5" />,
    status: "available",
  },
  {
    name: "GitLab",
    icon: <GitLabIcon className="h-5 w-5" />,
    status: "available",
  },
];

interface IntegrationBadgeProps {
  integration: Integration;
  className?: string;
}

function IntegrationBadge({ integration, className }: IntegrationBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground shadow-sm transition-colors hover:bg-accent",
        className
      )}
    >
      {integration.icon}
      <span>{integration.name}</span>
      {integration.status === "available" ? (
        <span className="ml-1 flex h-2 w-2 rounded-full bg-green-500" />
      ) : (
        <span className="ml-1 text-xs text-muted-foreground">Soon</span>
      )}
    </div>
  );
}

export function IntegrationBadges() {
  return (
    <section className="border-y border-border bg-muted/30 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <p className="text-sm font-medium text-muted-foreground">
            Integrates with:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {integrations.map((integration) => (
              <IntegrationBadge
                key={integration.name}
                integration={integration}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntegrationBadges;
