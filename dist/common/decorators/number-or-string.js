"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNumberOrStringRequire = exports.IsNumberOrString = void 0;
const class_validator_1 = require("class-validator");
let IsNumberOrString = class IsNumberOrString {
    validate(text, _arguments) {
        if (typeof text === 'string' && text === 'all')
            return true;
        for (const item of text) {
            if (typeof item !== 'number' || Number.isNaN(item)) {
                return false;
            }
        }
        return true;
    }
    defaultMessage(arguments_) {
        return `${arguments_.property} must be an array number and greater than 1 or string`;
    }
};
exports.IsNumberOrString = IsNumberOrString;
exports.IsNumberOrString = IsNumberOrString = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'string-or-number', async: false })
], IsNumberOrString);
let IsNumberOrStringRequire = class IsNumberOrStringRequire {
    validate(text, _arguments) {
        if (text === undefined)
            return false;
        if (typeof text === 'string' && text === 'all')
            return true;
        for (const item of text) {
            if (typeof item !== 'number' || Number.isNaN(item)) {
                return false;
            }
        }
        return true;
    }
    defaultMessage(arguments_) {
        return `${arguments_.property}  must be an array number or string and not empty`;
    }
};
exports.IsNumberOrStringRequire = IsNumberOrStringRequire;
exports.IsNumberOrStringRequire = IsNumberOrStringRequire = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'string-or-number-require', async: false })
], IsNumberOrStringRequire);
