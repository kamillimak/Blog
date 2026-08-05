import { execSync } from "child_process";

try {
  console.log("=== STEP 1: Building Main Switcher Portal to dist/ ===");
  execSync("npx vite build --base=/Blog/ --outDir dist", {
    stdio: "inherit",
  });

  console.log("=== STEP 2: Building Version 1 (Editorial) to dist/version1/ ===");
  execSync("npx vite build --base=/Blog/version1/ --outDir dist/version1", {
    env: { ...process.env, VITE_CONCEPT: "editorial" },
    stdio: "inherit",
  });

  console.log("=== STEP 3: Building Version 2 (Cyber) to dist/version2/ ===");
  execSync("npx vite build --base=/Blog/version2/ --outDir dist/version2", {
    env: { ...process.env, VITE_CONCEPT: "dashboard" },
    stdio: "inherit",
  });

  console.log("=== STEP 4: Generating SEO snapshots for main build ===");
  execSync("tsx scripts/generate-seo-assets.ts", {
    stdio: "inherit",
  });

  console.log("=== ALL BUILDS COMPLETED SUCCESSFULLY ===");
} catch (error) {
  console.error("Build failed:", error);
  process.exit(1);
}
