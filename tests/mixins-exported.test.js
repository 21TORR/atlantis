import test from "ava";
import {compileScss} from "./helpers/scss";


test("All mixins are properly exported", t => {
	const expectedMixins = [
		// Container
		"centered-container(110rem, 1.1rem)",

		// Media Queries
		"on-max-height(11rem) { color: red; }",
		"on-max-width(11rem) { color: red; }",
		"on-min-height(11rem) { color: red; }",
		"on-min-width(11rem) { color: red; }",
	];

	expectedMixins.forEach(mixin => {
		const css = compileScss(`
			@use "mixins";
			
			.my-selector {
				@include mixins.${mixin}; 
			}
		`);

		t.is(css.length > 0, true, "should have output");
		t.regex(css, /(^|\b|\{)\.my-selector\{/, "should contain the selector");
	});
});
