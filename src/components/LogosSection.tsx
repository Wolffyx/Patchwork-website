import { cn } from "@/lib/utils";

interface CompanyLogo {
  name: string;
  placeholder: boolean;
}

const companyLogos: CompanyLogo[] = [
  { name: "Company A", placeholder: true },
  { name: "Company B", placeholder: true },
  { name: "Company C", placeholder: true },
  { name: "Company D", placeholder: true },
  { name: "Company E", placeholder: true },
  { name: "Company F", placeholder: true },
];

interface LogoPlaceholderProps {
  company: CompanyLogo;
  className?: string;
}

function LogoPlaceholder({ company, className }: LogoPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex h-16 items-center justify-center rounded-lg border border-dashed border-border bg-card/50 px-6 text-sm text-muted-foreground transition-colors hover:border-primary/50",
        className
      )}
    >
      {company.placeholder ? `[${company.name}]` : company.name}
    </div>
  );
}

export function LogosSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Trusted by teams at
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {companyLogos.map((company) => (
            <LogoPlaceholder key={company.name} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogosSection;
