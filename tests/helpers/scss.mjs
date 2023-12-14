import * as sass from "sass";
import path from "path";
import {fileURLToPath} from "node:url";

/**
 * Compiles the scss
 *
 * @param {string} scss
 * @return {string}
 */
export function compileScss (scss)
{
	return sass.renderSync({
		data: scss,
		includePaths: [path.join(fileURLToPath(import.meta.url), "/../..")],
		outputStyle: "compressed",
	}).css.toString();
}
