import test from "ava";
import {compileScss} from "./helpers/scss";

test("All functions are properly exported", t => {
	const expectedFunctions = [
		// SVG
		"inline-svg('<svg..>')",
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
