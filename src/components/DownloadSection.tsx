import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Download, Apple, Monitor, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Platform = "macos" | "windows" | "linux" | "unknown";

interface PlatformInfo {
  name: string;
  icon: ReactNode;
  requirements: string[];
}

interface PlatformDownload {
  downloadUrl: string;
  fileName: string;
}

const REPO_OWNER = "Wolffyx";
const REPO_NAME = "flowpatch";
const GITHUB_RELEASES_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}/releases`;
const GITHUB_API_LATEST_RELEASE_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;

type GithubAsset = {
  name?: string;
  browser_download_url?: string;
};

const SKIP_ASSET_PATTERNS = [
  /blockmap/i,
  /\.yml$/i,
  /\.yaml$/i,
  /\.txt$/i,
  /\.sig$/i,
  /\.sha\d*/i,
  /source\s*code/i,
];

type AssetMatch = {
  platform: Exclude<Platform, "unknown">;
  priority: number;
};

const PLATFORMS: Record<Exclude<Platform, "unknown">, PlatformInfo> = {
  macos: {
    name: "macOS",
    icon: <Apple className="w-5 h-5" />,
    requirements: ["macOS 11 (Big Sur) or later", "Apple Silicon or Intel processor", "4GB RAM minimum"],
  },
  windows: {
    name: "Windows",
    icon: <Monitor className="w-5 h-5" />,
    requirements: ["Windows 10 or later", "64-bit processor", "4GB RAM minimum"],
  },
  linux: {
    name: "Linux",
    icon: <LinuxIcon className="w-5 h-5" />,
    requirements: ["Ubuntu 20.04+ or equivalent", "64-bit processor", "4GB RAM minimum"],
  },
};

function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M7 13l-2 9h14l-2-9" />
      <circle cx="10" cy="7" r="1" fill="currentColor" />
      <circle cx="14" cy="7" r="1" fill="currentColor" />
      <path d="M9.5 10c.5.5 2.5.5 5 0" />
    </svg>
  );
}

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";

  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform?.toLowerCase() ?? "";

  if (platform.includes("mac") || userAgent.includes("mac")) {
    return "macos";
  }
  if (platform.includes("win") || userAgent.includes("win")) {
    return "windows";
  }
  if (platform.includes("linux") || userAgent.includes("linux")) {
    return "linux";
  }

  return "unknown";
}

function classifyAsset(name: string): AssetMatch | null {
  const normalized = name.toLowerCase();

  // Quickly skip metadata/update helper artifacts
  if (SKIP_ASSET_PATTERNS.some((pattern) => pattern.test(normalized))) {
    return null;
  }

  if (normalized.endsWith(".dmg")) {
    return { platform: "macos", priority: 1 };
  }

  if (normalized.endsWith(".zip") && (normalized.includes("mac") || normalized.includes("darwin") || normalized.includes("osx"))) {
    return { platform: "macos", priority: 2 };
  }

  if (normalized.endsWith(".exe")) {
    return { platform: "windows", priority: 1 };
  }

  if (normalized.endsWith(".msi")) {
    return { platform: "windows", priority: 2 };
  }

  if (normalized.endsWith(".zip") && normalized.includes("win")) {
    return { platform: "windows", priority: 3 };
  }

  if (normalized.endsWith(".appimage")) {
    return { platform: "linux", priority: 1 };
  }

  if (normalized.endsWith(".deb")) {
    return { platform: "linux", priority: 2 };
  }

  if (normalized.endsWith(".rpm") || normalized.endsWith(".tar.gz") || normalized.endsWith(".tar.xz")) {
    return { platform: "linux", priority: 3 };
  }

  return null;
}

interface DownloadButtonProps {
  platform: PlatformInfo & PlatformDownload;
  isDetected?: boolean;
}

function DownloadButton({ platform, isDetected = false }: DownloadButtonProps) {
  return (
    <a
      href={platform.downloadUrl}
      className={cn(
        "flex items-center gap-3 px-6 py-4 rounded-lg border transition-all duration-200",
        "hover:border-primary hover:bg-accent",
        isDetected
          ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground"
          : "bg-card text-card-foreground border-border"
      )}
    >
      {platform.icon}
      <div className="flex flex-col items-start">
        <span className="font-semibold">Download for {platform.name}</span>
        <span className={cn("text-sm", isDetected ? "text-primary-foreground/80" : "text-muted-foreground")}>
          {platform.fileName}
        </span>
      </div>
      <Download className="w-5 h-5 ml-auto" />
    </a>
  );
}

interface InstallationInstructionsProps {
  platform: Exclude<Platform, "unknown">;
}

function InstallationInstructions({ platform }: InstallationInstructionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const instructions: Record<Exclude<Platform, "unknown">, string[]> = {
    macos: [
      "Download the .dmg file",
      "Open the downloaded file",
      "Drag Patchwork to your Applications folder",
      "Open Patchwork from Applications",
      "If prompted, allow the app in System Preferences > Security & Privacy",
    ],
    windows: [
      "Download the Setup.exe file",
      "Run the installer",
      "Follow the installation wizard",
      "Launch Patchwork from the Start menu or desktop shortcut",
    ],
    linux: [
      "Download the .AppImage file",
      "Make it executable: chmod +x Patchwork-*.AppImage",
      "Run the AppImage file",
      "Optionally, use AppImageLauncher for desktop integration",
    ],
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        <span className="font-medium">Installation Instructions for {PLATFORMS[platform].name}</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {isOpen && (
        <div className="px-4 py-3 bg-card">
          <ol className="list-decimal list-inside space-y-2 text-card-foreground">
            {instructions[platform].map((step, index) => (
              <li key={index} className="text-sm">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export function DownloadSection() {
  const [detectedPlatform] = useState<Platform>(() => detectPlatform());
  const [version, setVersion] = useState<string>("latest");
  const [platformDownloads, setPlatformDownloads] = useState<Record<Exclude<Platform, "unknown">, PlatformDownload>>({
    macos: {
      downloadUrl: `${GITHUB_RELEASES_URL}/latest`,
      fileName: "Download latest macOS build",
    },
    windows: {
      downloadUrl: `${GITHUB_RELEASES_URL}/latest`,
      fileName: "Download latest Windows build",
    },
    linux: {
      downloadUrl: `${GITHUB_RELEASES_URL}/latest`,
      fileName: "Download latest Linux build",
    },
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchLatestRelease() {
      try {
        const response = await fetch(GITHUB_API_LATEST_RELEASE_URL, {
          headers: {
            Accept: "application/vnd.github+json",
          },
        });

        if (!response.ok) {
          throw new Error(`GitHub release request failed with status ${response.status}`);
        }

        const data = await response.json();
        const newVersion = (data.tag_name ?? data.name ?? "latest").replace(/^v/i, "");
        const assets: GithubAsset[] = Array.isArray(data.assets) ? data.assets : [];

        const downloads: Partial<Record<Exclude<Platform, "unknown">, PlatformDownload>> = {};
        const priorities: Partial<Record<Exclude<Platform, "unknown">, number>> = {};

        for (const asset of assets) {
          const name = asset?.name ?? "";
          const url = asset?.browser_download_url;
          if (!url || !name) continue;

          const match = classifyAsset(name);
          if (!match) continue;

          const currentPriority = priorities[match.platform] ?? Number.MAX_SAFE_INTEGER;
          if (match.priority < currentPriority) {
            priorities[match.platform] = match.priority;
            downloads[match.platform] = { downloadUrl: url, fileName: name };
          }
        }

        if (!cancelled) {
          setVersion(newVersion);
          setPlatformDownloads((prev) => ({
            macos: downloads.macos ?? prev.macos,
            windows: downloads.windows ?? prev.windows,
            linux: downloads.linux ?? prev.linux,
          }));
        }
      } catch (error) {
        console.error("Failed to load latest FlowPatch release", error);
      }
    }

    fetchLatestRelease();

    return () => {
      cancelled = true;
    };
  }, []);

  const platformOrder: Exclude<Platform, "unknown">[] = detectedPlatform !== "unknown"
    ? [detectedPlatform, ...(Object.keys(PLATFORMS).filter((p) => p !== detectedPlatform) as Exclude<Platform, "unknown">[])]
    : ["macos", "windows", "linux"];

  const platformList: Record<Exclude<Platform, "unknown">, PlatformInfo & PlatformDownload> = {
    macos: { ...PLATFORMS.macos, ...platformDownloads.macos },
    windows: { ...PLATFORMS.windows, ...platformDownloads.windows },
    linux: { ...PLATFORMS.linux, ...platformDownloads.linux },
  };

  return (
    <section className="w-full py-16 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Download Patchwork</h2>
          <p className="text-muted-foreground mb-2">
            Get started with Patchwork on your preferred platform
          </p>
          <span className="inline-block px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground rounded-full">
            Version {version}
          </span>
        </div>

        {/* Download Buttons */}
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 mb-8">
          {platformOrder.map((platform) => (
            <DownloadButton
              key={platform}
              platform={platformList[platform]}
              isDetected={platform === detectedPlatform}
            />
          ))}
        </div>

        {/* System Requirements */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">System Requirements</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {(Object.keys(PLATFORMS) as Exclude<Platform, "unknown">[]).map((platform) => (
              <div key={platform} className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  {PLATFORMS[platform].icon}
                  <h4 className="font-medium text-card-foreground">{PLATFORMS[platform].name}</h4>
                </div>
                <ul className="space-y-1">
                  {PLATFORMS[platform].requirements.map((req, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      • {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Installation Instructions Accordion */}
        <div className="mb-8 space-y-2">
          <h3 className="text-xl font-semibold text-foreground mb-4">Installation Instructions</h3>
          {(Object.keys(PLATFORMS) as Exclude<Platform, "unknown">[]).map((platform) => (
            <InstallationInstructions key={platform} platform={platform} />
          ))}
        </div>

        {/* GitHub Releases Link */}
        <div className="text-center">
          <a
            href={GITHUB_RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>View all releases on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default DownloadSection;
