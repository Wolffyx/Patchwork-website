import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import type { Theme } from "@/lib/theme-context";

const themeOptions: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: "light", icon: Sun, label: "Light mode" },
  { value: "dark", icon: Moon, label: "Dark mode" },
  { value: "system", icon: Monitor, label: "System preference" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex items-center gap-0.5 rounded-full bg-secondary p-1"
      role="radiogroup"
      aria-label="Theme selection"
    >
      {themeOptions.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "relative rounded-full p-2 transition-all duration-200 ease-out",
            "hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            theme === value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:bg-accent/50"
          )}
          role="radio"
          aria-checked={theme === value}
          aria-label={label}
          title={label}
        >
          <Icon
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              theme === value && "scale-110"
            )}
            aria-hidden="true"
          />
        </button>
      ))}
    </div>
  );
}
