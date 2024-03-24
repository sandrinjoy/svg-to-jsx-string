import { parse } from "svg-parser";
import { noUnSupportedTagNames, sanitizeAttributes } from "./util.js";

function _parseSVG(svg) {
  const parsedSVG = parse(svg);
  if (parsedSVG.children[0].tagName !== "svg")
    throw "Passed svg string does not include an <svg> tag as the parent wrapper";
  return parsedSVG.children[0];
}
function _conformSVG(parsedSVG) {
  parsedSVG.properties = sanitizeAttributes(parsedSVG.properties);
  noUnSupportedTagNames(parsedSVG.children);

  parsedSVG.children = Array.isArray(parsedSVG.children)
    ? parsedSVG.children.map((child) => _conformSVG(child))
    : parsedSVG.children;
  return parsedSVG;
}
function tagStartString(tagName, properties) {
  return `<${tagName} ${Object.entries(properties)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ")}>`;
}
function tagCloseString(tagName) {
  return "</" + tagName + ">";
}
function tagChildrenString(children) {
  return Array.isArray(children)
    ? children
        // @ts-ignore
        .map((child) =>
          typeof child === "string"
            ? child
            : _JsxComponentString(
                child.tagName,
                child.properties,
                child.children
              )
        )
        .join("")
    : children;
}
function _JsxComponentString(tagName, properties, children) {
  return (
    tagStartString(tagName, properties) +
    tagChildrenString(children) +
    tagCloseString(tagName)
  );
}

export function svgToJsxString(svgString) {
  const svgJson = _parseSVG(svgString);
  const conformedSVG = _conformSVG(svgJson);
  const { properties, children } = conformedSVG;
  return _JsxComponentString("svg", properties, children);
}
