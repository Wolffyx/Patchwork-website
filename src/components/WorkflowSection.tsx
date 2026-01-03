import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  FolderGit2,
  Tags,
  LayoutList,
  RefreshCw,
  Check,
  ChevronRight,
  Play,
  Pause,
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
  isAutoPlaying: boolean;
}

function StepIndicator({ steps, currentStep, onStepClick, isAutoPlaying }: StepIndicatorProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-2 sm:gap-0">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <button
            onClick={() => onStepClick(step.id)}
            className={cn(
              "relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300",
              "hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              currentStep === step.id
                ? "bg-primary text-primary-foreground shadow-md scale-105"
                : currentStep > step.id
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary text-secondary-foreground"
            )}
          >
            <span
              className={cn(
                "flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium transition-all duration-300",
                currentStep === step.id
                  ? "bg-primary-foreground text-primary"
                  : currentStep > step.id
                    ? "bg-primary text-primary-foreground"
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
            {currentStep === step.id && isAutoPlaying && (
              <span className="absolute inset-0 rounded-lg animate-pulse bg-primary/20" />
            )}
          </button>
          {index < steps.length - 1 && (
            <div className="hidden sm:flex items-center mx-1">
              <div
                className={cn(
                  "h-0.5 w-4 transition-all duration-500",
                  currentStep > index + 1 ? "bg-primary" : "bg-muted"
                )}
              />
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-colors duration-300",
                  currentStep > index + 1 ? "text-primary" : "text-muted-foreground"
                )}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

interface StepContentProps {
  step: WorkflowStep;
  stepKey: number;
}

function StepContent({ step, stepKey }: StepContentProps) {
  return (
    <div key={stepKey} className="mt-8 animate-in fade-in-50 slide-in-from-right-5 duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground animate-in zoom-in-50 duration-300">
          {step.icon}
        </div>
        <div className="animate-in slide-in-from-left-3 duration-300">
          <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
          <p className="text-muted-foreground">{step.description}</p>
        </div>
      </div>
      <div className="grid gap-3 mt-6">
        {step.details.map((detail, index) => (
          <div
            key={`${stepKey}-${index}`}
            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors animate-in fade-in-50 slide-in-from-bottom-2 duration-300"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
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

const AUTO_PLAY_INTERVAL = 5000; // 5 seconds per step

export function WorkflowSection({ className }: WorkflowSectionProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const activeStep = workflowSteps.find((step) => step.id === currentStep);

  const goToNextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev >= workflowSteps.length) {
        return 1; // Loop back to first step
      }
      return prev + 1;
    });
  }, []);

  const handleStepClick = useCallback((stepId: number) => {
    setCurrentStep(stepId);
    setIsAutoPlaying(false); // Stop auto-play when user manually selects a step
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(goToNextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNextStep]);

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
          <div className="flex items-center justify-between mb-4">
            <StepIndicator
              steps={workflowSteps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
              isAutoPlaying={isAutoPlaying}
            />
            <button
              onClick={toggleAutoPlay}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                isAutoPlaying
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
              title={isAutoPlaying ? "Pause walkthrough" : "Auto-play walkthrough"}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span className="hidden sm:inline">Auto</span>
                </>
              )}
            </button>
          </div>

          {isAutoPlaying && (
            <div className="h-1 bg-secondary rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-primary transition-all ease-linear"
                style={{
                  animation: `progress ${AUTO_PLAY_INTERVAL}ms linear`,
                  width: "100%",
                }}
                key={currentStep}
              />
            </div>
          )}

          {activeStep && <StepContent step={activeStep} stepKey={currentStep} />}

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <button
              onClick={() => {
                setCurrentStep((prev) => Math.max(1, prev - 1));
                setIsAutoPlaying(false);
              }}
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
              onClick={() => {
                setCurrentStep((prev) => Math.min(workflowSteps.length, prev + 1));
                setIsAutoPlaying(false);
              }}
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
