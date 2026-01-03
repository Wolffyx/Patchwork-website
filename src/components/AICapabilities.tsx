import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Layers,
  Bot,
  Workflow,
  Sparkles,
  ArrowRight,
  User,
  Send,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl bg-card border border-border",
        "hover:shadow-lg hover:border-primary/20 transition-all duration-300",
        className
      )}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function ChatMessage({
  isUser,
  message,
}: {
  isUser: boolean;
  message: string;
}) {
  return (
    <div className={cn("flex gap-3", isUser ? "flex-row-reverse" : "flex-row")}>
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
          isUser ? "bg-primary" : "bg-primary/10"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-primary-foreground" />
        ) : (
          <Sparkles className="w-4 h-4 text-primary" />
        )}
      </div>
      <div
        className={cn(
          "px-4 py-2 rounded-2xl max-w-[80%]",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted text-foreground rounded-bl-md"
        )}
      >
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}

function AIChatDemo() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xl">
      <div className="px-4 py-3 border-b border-border bg-muted/50 flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-foreground">
          Draft with AI
        </span>
      </div>
      <div className="p-4 space-y-4 min-h-[280px]">
        <ChatMessage
          isUser={true}
          message="Create a card for implementing user authentication with OAuth"
        />
        <ChatMessage
          isUser={false}
          message="I'll create a card for OAuth authentication. Should I include specific providers like Google or GitHub, and what priority level would you like?"
        />
        <ChatMessage isUser={true} message="Yes, include Google and GitHub. High priority." />
        <ChatMessage
          isUser={false}
          message="Done! I've created a high-priority card 'Implement OAuth Authentication' with subtasks for Google and GitHub integration, including security considerations."
        />
      </div>
      <div className="px-4 py-3 border-t border-border bg-muted/30">
        <div className="flex items-center gap-2 bg-background rounded-lg px-3 py-2 border border-border">
          <input
            type="text"
            placeholder="Ask AI to help create or refine cards..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            readOnly
          />
          <Send className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

function WorkflowStep({
  number,
  title,
  description,
  isLast = false,
}: {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
          {number}
        </div>
        {!isLast && <div className="w-0.5 h-16 bg-border mt-2" />}
      </div>
      <div className="pt-1">
        <h4 className="font-semibold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}

export function AICapabilities() {
  return (
    <section
      id="ai-capabilities"
      className="py-20 border-t border-border scroll-mt-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Supercharge Your Workflow with AI
          </h2>
          <p className="text-lg text-muted-foreground">
            Patchwork integrates intelligent AI features that enhance your
            productivity while keeping you in complete control. Let AI handle
            the tedious work so you can focus on what matters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Draft with AI Chat
            </h3>
            <p className="text-muted-foreground mb-6">
              Create and refine cards through natural conversation. Simply
              describe what you need, and our AI assistant will help you draft
              detailed, well-structured cards complete with descriptions,
              acceptance criteria, and subtasks.
            </p>
            <ul className="space-y-3">
              {[
                "Natural language card creation",
                "Intelligent suggestions and refinements",
                "Automatic categorization and tagging",
                "Context-aware responses based on your project",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <AIChatDemo />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <FeatureCard
            icon={<MessageSquare className="w-6 h-6 text-primary" />}
            title="AI Chat Interface"
            description="Converse naturally to create, edit, and organize your cards without leaving the board."
          />
          <FeatureCard
            icon={<Layers className="w-6 h-6 text-primary" />}
            title="Batch Generation"
            description="Generate multiple cards at once from app descriptions, requirements docs, or user stories."
          />
          <FeatureCard
            icon={<Bot className="w-6 h-6 text-primary" />}
            title="AI Workers"
            description="Automate repetitive tasks with AI workers that process cards based on your rules."
          />
          <FeatureCard
            icon={<Workflow className="w-6 h-6 text-primary" />}
            title="Smart Workflows"
            description="AI suggests optimal card flows and identifies bottlenecks in your process."
          />
        </div>

        <div className="bg-muted/30 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                AI That Assists, Not Replaces
              </h3>
              <p className="text-muted-foreground mb-6">
                Our AI is designed to amplify your capabilities, not take over.
                Every AI suggestion requires your approval, and you maintain
                full control over your board, cards, and workflows. Think of it
                as a smart assistant that learns your preferences and helps you
                work more efficiently.
              </p>
              <div className="space-y-1">
                <WorkflowStep
                  number={1}
                  title="You Initiate"
                  description="Request AI help through chat or batch actions"
                />
                <WorkflowStep
                  number={2}
                  title="AI Suggests"
                  description="Receive intelligent recommendations and drafts"
                />
                <WorkflowStep
                  number={3}
                  title="You Decide"
                  description="Review, modify, or approve AI suggestions"
                />
                <WorkflowStep
                  number={4}
                  title="AI Learns"
                  description="Feedback improves future suggestions"
                  isLast
                />
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                AI Worker Example
              </h4>
              <div className="space-y-4 text-sm">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="font-medium text-foreground">
                    When: Card moves to "Review"
                  </p>
                  <p className="text-muted-foreground">
                    Then: AI analyzes card for completeness
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="font-medium text-foreground">
                    When: New card created from template
                  </p>
                  <p className="text-muted-foreground">
                    Then: AI suggests relevant labels and assignees
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="font-medium text-foreground">
                    When: Card exceeds time estimate
                  </p>
                  <p className="text-muted-foreground">
                    Then: AI flags and suggests splitting into subtasks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
