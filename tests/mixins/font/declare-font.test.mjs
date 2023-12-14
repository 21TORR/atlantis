import test from "ava";
import {compileScss} from "../../helpers/scss.mjs";


test("declare-font: proper path generation", t => {
	const css = compileScss(`
		@use "mixins/font";
		
		a {
			@include font.declare-font('../test/abc', 'Abc', (light: 300, bold: 700));
		}
	`);

	t.true(-1 !== css.indexOf(`url("../test/abc-300-normal.woff2")`));
	t.true(-1 !== css.indexOf(`url("../test/abc-300-italic.woff2")`));
	t.true(-1 !== css.indexOf(`url("../test/abc-700-normal.woff2")`));
	t.true(-1 !== css.indexOf(`url("../test/abc-700-italic.woff2")`));
	t.true(-1 !== css.indexOf(`url("../test/abc-300-normal.woff")`));
	t.true(-1 !== css.indexOf(`url("../test/abc-300-italic.woff")`));
	t.true(-1 !== css.indexOf(`url("../test/abc-700-normal.woff")`));
	t.true(-1 !== css.indexOf(`url("../test/abc-700-italic.woff")`));
});
