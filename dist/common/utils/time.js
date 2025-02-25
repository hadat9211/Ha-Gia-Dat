"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secondToMinute = exports.getTimeStampInSecond = void 0;
const getTimeStampInSecond = () => {
    return Math.floor(Date.now() / 1000);
};
exports.getTimeStampInSecond = getTimeStampInSecond;
const secondToMinute = (second) => Math.floor(second / 60);
exports.secondToMinute = secondToMinute;
