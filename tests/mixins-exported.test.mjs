import test from "ava";
import {compileScss} from "./helpers/scss.mjs";


test("All mixins are properly exported", t => {
	const expectedMixins = [
		// Children
		"on-n-siblings(3) { color: red; }",

		// Container
		"centered-container(110rem, 1.1rem)",

		// Fonts,
		"emoji-fonts(Georgia)",
		"system-fonts(Georgia)",
		"declare-font('.../test', 'Test', (300 400))",
		"fetch-font-weight(light, (light: 300))",
		"font-face('Test', url('test-300-normal.woff2'))",

		// Interaction
		"on-interaction { color: red; }",

		// Media Queries
		"on-max-height(11rem) { color: red; }",
		"on-max-width(11rem) { color: red; }",
		"on-min-height(11rem) { color: red; }",
		"on-min-width(11rem) { color: red; }",
		"on-media($min-width: 11rem) { color: red; }",

		// Positioning
		"center-absolute",
		"center-children",
		"center-horizontal",
		"fill-parent",
		"flex-equal-columns",
		"flex-fill-height",
		"flex-fill-width",
		"flex-fixed-height",
		"flex-fixed-width",

		// Scroll
		"smooth-scroll",

		// Size
		"aspect-ratio (1.1rem, 1.1rem)",
		"square (1.1rem)",

		// SVG
		"color-svg (red)",
		"svg-child",

		// Transition
		"transition(width)",

		// Visibility
		"hide-text",
		"text-overflow-ellipsis",
	];

	// we need to add another declaration here, as sass might otherwise automatically remove
	// the empty selector
	expectedMixins.forEach(mixin => {
		const css = compileScss(`
			@use "mixins";
			
			.my-selector {
				color: red;
				@include mixins.${mixin}; 
			}
		`);

		t.is(css.length > 0, true, `${mixin}: should have output`);
		t.regex(css, /(^|\b|\{)\.my-selector.*?\{/, `${mixin}: should contain the selector`);
	});
});
