import test from "ava";
import {compileScss} from "./helpers/scss";


test("All mixins are properly exported", t => {
	const expectedMixins = [
		// Container
		"centered-container(110rem, 1.1rem)",

		// Fonts,
		"emoji-fonts(Georgia)",
		"system-fonts(Georgia)",

		// Interaction
		"on-interaction { color: red; }",

		// Media Queries
		"on-max-height(11rem) { color: red; }",
		"on-max-width(11rem) { color: red; }",
		"on-min-height(11rem) { color: red; }",
		"on-min-width(11rem) { color: red; }",

		// Positioning
		"center-children",
		"center-element",
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

	expectedMixins.forEach(mixin => {
		const css = compileScss(`
			@use "mixins";
			
			.my-selector {
				@include mixins.${mixin}; 
			}
		`);

		t.is(css.length > 0, true, "should have output");
		t.regex(css, /(^|\b|\{)\.my-selector.*?\{/, "should contain the selector");
	});
});
