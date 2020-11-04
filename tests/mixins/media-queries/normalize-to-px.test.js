import test from "ava";
import {compileScss} from "../../helpers/scss";


test("normalize-to-px: Normalize to px variations", t => {
	[
		["1.1rem", "11px"],
		["11px", "11px"],
	].forEach(([input, expected]) => {
		const css = compileScss(`
			@use "mixins/media-queries";
			
			a {
				content: media-queries.normalize-to-px(${input});
			}
		`);

		t.is(css, `a{content:${expected}}`);
	});
});


test("normalize-to-px: Invalid units", t => {
	[
		"in",
		"cm",
		"mm",
		"pt",
		"em",
		"",
	].forEach(unit => {
		const error = t.throws(
			() => compileScss(`
				@use "mixins/media-queries";
				
				a {
					content: media-queries.normalize-to-px(11${unit});
				}
			`),
		);

		t.regex(error.message, new RegExp(`Can't automatically convert value with unit '${unit}'`));
	});
});
