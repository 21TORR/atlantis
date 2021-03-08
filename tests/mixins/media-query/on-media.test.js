import test from "ava";
import {compileScss} from "../../helpers/scss";

// tests the different variations
// warning: the compressed style has no space in screen and (...)and (...)and (...)
//                                                             ^^^      ^^^
test("on-media: Different parameter variations", t => {
	[
		["$max-width: 10rem", "@media screen and (max-width: 100px)"],
		["$min-width: 10rem", "@media screen and (min-width: 100px)"],
		["$max-width: 10rem, $min-height: 20rem", "@media screen and (min-height: 200px)and (max-width: 100px)"],
		["$min-width: 1rem, $min-height: 2rem, $max-width: 3rem, $max-height: 4rem", "@media screen and (min-width: 10px)and (min-height: 20px)and (max-width: 30px)and (max-height: 40px)"],
	].forEach(([parameters, expected]) => {
		const css = compileScss(`
			@use "mixins/media-query";
			
			@include media-query.on-media(${parameters}) {
				a {
					color: red;
				}
			}
		`);

		t.is(css, `${expected}{a{color:red}}`);
	});
});


test("on-media: empty", t => {
	const css = compileScss(`
		@use "mixins/media-query";
		
		@include media-query.on-media() {
			a {
				color: red;
			}
		}
	`);

	t.is(css, `a{color:red}`);
});


test("on-media: convenience wrappers", t => {
	[
		["media-query.on-max-width(10rem)", "@media screen and (max-width: 100px)"],
		["media-query.on-min-width(10rem)", "@media screen and (min-width: 100px)"],
		["media-query.on-max-height(10rem)", "@media screen and (max-height: 100px)"],
		["media-query.on-min-height(10rem)", "@media screen and (min-height: 100px)"],
	].forEach(([call, expected]) => {
		const css = compileScss(`
			@use "mixins/media-query";
			
			@include ${call} {
				a {
					color: red;
				}
			}
		`);

		t.is(css, `${expected}{a{color:red}}`);
	});
});
