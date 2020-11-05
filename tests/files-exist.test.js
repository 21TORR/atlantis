import test from "ava";
import {compileScss} from "./helpers/scss";


test("All files do exist at the given paths", t => {
	const expectedFiles = [
		"mixins",
		"reset",
	];

	expectedFiles.forEach(filePath => {
		const css = compileScss(`
			@use "${filePath}";
			
			.my-selector {
				color: red; 
			}
		`);

		t.is(css.length > 0, true, "should have output");
		t.regex(css, /(^|\b|\{|})\.my-selector.*?\{/, "should contain the selector");
	});
});
