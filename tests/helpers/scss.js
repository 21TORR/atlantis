import sass from "sass";
import path from "path";

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
		includePaths: [path.join(__dirname, "../..")],
		outputStyle: "compressed",
	}).css.toString();
}
