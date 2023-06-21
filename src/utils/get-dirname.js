import { dirname } from "path";
import {fileURLToPath} from "url";

export const getDirname = ( path ) => dirname(fileURLToPath(path));
