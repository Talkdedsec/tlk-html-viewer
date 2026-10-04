import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Development server only. The release is built by scripts/build-standalone.mjs.
export default defineConfig({ plugins: [react()] });
