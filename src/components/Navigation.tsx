import { useState, useCallback } from "react";
import { Menu, X, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GITHUB_BASE_URL } from "@/config/github";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  external?: boolean;
}

function NavLink({ href, children, onClick, external }: NavLinkProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!external && href.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      onClick?.();
    },
    [href, onClick, external]
  );

  return (
    <a
      href={href}
      onClick={handleClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
    >
      {children}
    </a>
  );
}

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#docs", label: "Docs" },
  { href: "#download", label: "Download" },
  { href: GITHUB_BASE_URL, label: "GitHub", external: true },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center space-x-2"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="text-xl font-bold text-foreground">Patchwork</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                external={link.external}
              >
                {link.label === "GitHub" ? (
                  <span className="flex items-center gap-1.5">
                    <Github className="h-4 w-4" />
                    {link.label}
                  </span>
                ) : (
                  link.label
                )}
              </NavLink>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-80 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col space-y-4 pt-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                external={link.external}
              >
                {link.label === "GitHub" ? (
                  <span className="flex items-center gap-1.5">
                    <Github className="h-4 w-4" />
                    {link.label}
                  </span>
                ) : (
                  link.label
                )}
              </NavLink>
            ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
