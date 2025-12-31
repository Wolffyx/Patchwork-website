import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  FolderGit2,
  Tags,
  LayoutList,
  RefreshCw,
  Check,
  ChevronRight,
} from "lucide-react";

interface WorkflowStep {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
}

const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "Repository Onboarding",
    shortTitle: "Onboarding",
    description: "Connect your GitHub repository to Patchwork",
    icon: <FolderGit2 className="h-5 w-5" />,
    details: [
      "Install Patchwork on your machine",
      "Open your existing repository or clone a new one",
      "Patchwork automatically detects your project structure",
      "Initial sync pulls existing issues and PRs",
    ],
  },
  {
    id: 2,
    title: "Label Setup",
    shortTitle: "Labels",
    description: "Configure labels for Kanban column mapping",
    icon: <Tags className="h-5 w-5" />,
    details: [
      "Create labels like 'backlog', 'in-progress', 'review', 'done'",
      "Labels automatically map to Kanban columns",
      "Customize label colors for visual organization",
      "Supports existing GitHub label conventions",
    ],
  },
  {
    id: 3,
    title: "Create Cards",
    shortTitle: "Cards",
    description: "Add and organize tasks on your Kanban board",
    icon: <LayoutList className="h-5 w-5" />,
    details: [
      "Create cards directly from the Kanban interface",
      "Cards sync as GitHub issues automatically",
      "Drag and drop to change card status",
      "Use AI assistance to generate card descriptions",
    ],
  },
  {
    id: 4,
    title: "Sync & Collaborate",
    shortTitle: "Sync",
    description: "Keep everything in sync with your team",
    icon: <RefreshCw className="h-5 w-5" />,
    details: [
      "Real-time bidirectional sync with GitHub",
      "Team members see updates instantly",
      "Works with GitHub Projects for enterprise workflows",
      "Offline changes sync when reconnected",
    ],
  },
];

interface StepIndicatorProps {
  steps: WorkflowStep[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-2 sm:gap-0">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <button
            onClick={() => onStepClick(step.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
              "hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              currentStep === step.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            <span
              className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium",
                currentStep === step.id
                  ? "bg-primary-foreground text-primary"
                  : currentStep > step.id
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
              )}
            >
              {currentStep > step.id ? (
                <Check className="h-4 w-4" />
              ) : (
                step.id
              )}
            </span>
            <span className="hidden md:inline text-sm font-medium">
              {step.shortTitle}
            </span>
          </button>
          {index < steps.length - 1 && (
            <ChevronRight className="hidden sm:block h-4 w-4 mx-1 text-muted-foreground" />
          )}
        </div>
      ))}
    </div>
  );
}

interface StepContentProps {
  step: WorkflowStep;
}

function StepContent({ step }: StepContentProps) {
  return (
    <div className="mt-8 animate-in fade-in-50 duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
          {step.icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
          <p className="text-muted-foreground">{step.description}</p>
        </div>
      </div>
      <div className="grid gap-3 mt-6">
        {step.details.map((detail, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium shrink-0">
              {index + 1}
            </span>
            <span className="text-foreground">{detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface WorkflowSectionProps {
  className?: string;
}

export function WorkflowSection({ className }: WorkflowSectionProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const activeStep = workflowSteps.find((step) => step.id === currentStep);

  return (
    <section
      className={cn("py-16 md:py-24 px-4 md:px-8", className)}
      id="workflow"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get Started in Minutes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From repository setup to a fully synced Kanban board, follow these
            simple steps to transform your workflow.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
          <StepIndicator
            steps={workflowSteps}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />

          {activeStep && <StepContent step={activeStep} />}

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                currentStep === 1
                  ? "text-muted-foreground cursor-not-allowed"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentStep((prev) => Math.min(workflowSteps.length, prev + 1))}
              disabled={currentStep === workflowSteps.length}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                currentStep === workflowSteps.length
                  ? "text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              Next
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Patchwork integrates seamlessly with{" "}
            <span className="font-medium text-foreground">GitHub Projects</span>{" "}
            for enterprise-level project management.
          </p>
        </div>
      </div>
    </section>
  );
}
