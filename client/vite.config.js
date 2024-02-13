import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

/* because the vite.config root is in the client folder,
 * we need to specify the path to the .env file
 * also need to use dotenv-expand to expand the env variables
 * without this vite can't access the env variables using import.meta.env
 */
const env = dotenv.config({ path: "./.env" });
dotenvExpand.expand(env);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	root: "./client",
});
