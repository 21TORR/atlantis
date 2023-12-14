import test from "ava";
import {compileScss} from "./helpers/scss.mjs";


test("All private functions are not visible", t => {
	const privateFunctions = [
		"normalize-to-px(10rem)",
		"str-replace('ohai', 'o', 'hai')",
		"url-encode('ohai')",
		"extract-font-weight('a')",
		"extract-font-style('a')",
		"extract-font-format('a')",
	];

	privateFunctions.forEach(functionCall => {
		const error = t.throws(
			() => compileScss(`
			@use "mixins";
			
			.my-selector {
				content: mixins.${functionCall};
			}
			`),
		);

		t.regex(error.message, /Undefined function/);
	});
});
