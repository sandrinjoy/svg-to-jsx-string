// TODO: doesn't work.
import assert from "assert";
import { svgToJsxString } from "../src/index.js";
import { describe, it } from "mocha";

describe("svgToJsxString", () => {
  it("converts a simple SVG string to JSX string", () => {
    const svgString = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-reactroot="">
    <path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" stroke="#221b38" fill="none" d="M20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20Z"></path>
    <path stroke-linecap="round" stroke-miterlimit="10" stroke-width="1" stroke="#221b38" fill="none" d="M20 4H4C2.9 4 2 4.9 2 6L12 13L22 6C22 4.9 21.1 4 20 4Z"></path>
</svg>
    `;
    const expectedJsxString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" > <path stroke="#221b38" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M20 20H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2z" ></path> <path stroke="#221b38" strokeLinecap="round" strokeMiterlimit="10" d="M20 4H4c-1.1 0-2 .9-2 2l10 7 10-7c0-1.1-.9-2-2-2z" ></path> </svg>`;

    const actualJsxString = svgToJsxString(svgString);

    assert.equal(actualJsxString, expectedJsxString);
  });

  it("handles SVG with nested elements", () => {
    const svgString =
      '<svg><circle cx="50" cy="50" r="40" fill="green" /><rect x="100" y="100" width="50" height="80" fill="blue" /></svg>';
    const expectedJsxString =
      '<svg><circle cx="50" cy="50" r="40" fill="green" /><rect x="100" y="100" width="50" height="80" fill="blue" /></svg>';

    const actualJsxString = svgToJsxString(svgString);

    assert.equal(actualJsxString, expectedJsxString);
  });

  it("correctly handles attributes", () => {
    const svgString =
      '<text x="200" y="200" font-size="20" font-family="Arial">Hello, world!</text>';
    const expectedJsxString =
      '<text x="200" y="200" fontSize="20" fontFamily="Arial">Hello, world!</text>';

    const actualJsxString = svgToJsxString(svgString);

    assert.equal(actualJsxString, expectedJsxString);
  });

  // Add more test cases for different SVG elements and attributes
});
