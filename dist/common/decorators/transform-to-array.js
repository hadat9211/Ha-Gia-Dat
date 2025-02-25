"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformToArrayOrString = exports.TransformToArray = void 0;
const class_transformer_1 = require("class-transformer");
const converter_1 = require("../utils/converter");
const TransformToArray = () => {
    return (0, class_transformer_1.Transform)(({ value }) => (0, converter_1.toArray)(value));
};
exports.TransformToArray = TransformToArray;
const TransformToArrayOrString = () => {
    return (0, class_transformer_1.Transform)(({ value }) => {
        if (typeof value === 'string' && value === 'all') {
            return value;
        }
        value = (0, converter_1.toArray)(value).map(Number);
        return value;
    });
};
exports.TransformToArrayOrString = TransformToArrayOrString;
