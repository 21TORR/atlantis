import test from "ava";
import {compileScss} from "../../helpers/scss.mjs";


test("on-interaction: active classes", t => {
	[
		["", "a:active,a:focus,a:hover"],
		["null", "a:active,a:focus,a:hover"],
		["is-active", "a:active,a:focus,a:hover,a.is-active"],
		["'is-active'", "a:active,a:focus,a:hover,a.is-active"],
	].forEach(([value, expectedSelector]) => {
		const css = compileScss(`
			@use "mixins/interaction";
			
			a {
				@include interaction.on-interaction(${value}) {
					color: red;
				}
			}
		`);

		t.is(css, `${expectedSelector}{color:red}`);
	});
});
