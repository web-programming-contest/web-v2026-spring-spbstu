import {dirname, join} from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = "/gadgethub";
const BASE_ROOT = join(__dirname, "../frontend/");
const JSDLIVR_GITHUB_BASE_URL = "https://cdn.jsdelivr.net/gh";

// reliable format for jsdelivr:
// https://cdn.jsdelivr.net/gh/github-user-name/repo-name@branch/full-path-to-file?force_update=1
export {BASE_URL, BASE_ROOT, JSDLIVR_GITHUB_BASE_URL};