import test from "ava";
import {compileScss} from "../../helpers/scss.mjs";


const validTestCases = {
	"basic functionality": [
		`font.font-face("Test", url("test-300-normal.woff2"))`,
		[
			`font-family:"Test"`,
			`font-weight:300`,
			`font-style:normal`,
			`format("woff2")`,
			`font-display:fallback`,
		],
	],
	"default font-display": [
		`font.font-face("Test", url("test-300-normal.woff2"))`,
		[
			`font-display:fallback`,
		],
	],
	"basic functionality 2": [
		`font.font-face(Test, url("test-900-italic.otf"))`,
		[
			`font-family:Test`,
			`font-weight:900`,
			`font-style:italic`,
			`format("opentype")`,
		],
	],
	"format: woff": [
		`font.font-face(Test, url("test-100-normal.woff"))`,
		[
			`font-family:Test`,
			`font-weight:100`,
			`font-style:normal`,
			`format("woff")`,
		],
	],
	"overwrite everything": [
		`font.font-face(
			"Test", 
			url("test-100-normal.woff"),
			$font-display: swap,
			$font-weight: 400,
			$font-style: italic,
			$format: opentype,
		)`,
		[
			`font-family:"Test"`,
			`font-weight:400`,
			`font-style:italic`,
			`format("opentype")`,
			`font-display:swap`,
		],
	],
};

for (const testName in validTestCases)
{
	const testCall = validTestCases[testName][0];
	const assertContains = validTestCases[testName][1];

	test(`font-face (valid): ${testName}`, t => {
		const css = compileScss(`
			@use "mixins/font";
			
			a {
				@include ${testCall};
			}
		`);

		assertContains.forEach(mustContainString => t.true(
			-1 !== css.indexOf(mustContainString),
			`Must find '${mustContainString}' in '${css}'`,
		));
	});
}

const invalidTestCases = {
	"invalid font-weight": [
		`font.font-face("Test", url("test-123-normal.woff2"))`,
		/Could not automatically extract font-weight from path/,
	],
	"invalid font-style": [
		`font.font-face("Test", url("test-100-invalid.woff2"))`,
		/Could not automatically extract font-style from path/,
	],
	"invalid format": [
		`font.font-face("Test", url("test-100-normal.test"))`,
		/Could not automatically detect font format from path/,
	],
};


for (const testName in invalidTestCases)
{
	const testCall = invalidTestCases[testName][0];
	const errorMessage = invalidTestCases[testName][1];

	test(`font-face (invalid): ${testName}`, t => {
		t.throws(
			() => {
				compileScss(`
					@use "mixins/font";
					
					a {
						@include ${testCall};
					}
				`)
			},
			{
				message: errorMessage,
			}
		);
	});
}
