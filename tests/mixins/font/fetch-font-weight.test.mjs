import test from "ava";
import {compileScss} from "../../helpers/scss.mjs";


test("declare-font: proper path generation", t => {
	const working = compileScss(`
		@use "mixins/font";
		
		a {
			@include font.fetch-font-weight(light, (light: 300));
		}
	`);

	t.true(-1 !== working.indexOf(`font-weight:300`));

	t.throws(
		() => {
			compileScss(`
				@use "mixins/font";
				
				a {
					@include font.fetch-font-weight(missing, (light: 300));
				}
			`);
		},
		{
			message: /Unknown font weight: missing/,
		}
	)
});
