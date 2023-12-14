import test from "ava";
import {compileScss} from "./helpers/scss.mjs";

test("All functions are properly exported", t => {
	const expectedFunctions = [
		// SVG
		"inline-svg('<svg..>')",
		// Types
		"is-number(1)",
		"is-integer(2)",
	];

	expectedFunctions.forEach(mixin => {
		const css = compileScss(`
			@use "mixins";
			
			.my-selector {
				content: mixins.${mixin}; 
			}
		`);

		t.is(css.length > 0, true, "should have output");
		t.regex(css, /(^|\b|\{)\.my-selector.*?\{/, "should contain the selector");
	});
});
