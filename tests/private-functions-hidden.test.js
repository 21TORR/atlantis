import test from "ava";
import {compileScss} from "./helpers/scss";


test("All private functions are not visible", t => {
	const privateFunctions = [
		"normalize-to-px(10rem)",
		"str-replace('ohai', 'o', 'hai')",
		"url-encode('ohai')",
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
