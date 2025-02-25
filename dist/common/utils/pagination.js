"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePages = exports.getHasMoreInfiniteScroll = exports.getOffsetPagination = void 0;
const getOffsetPagination = (page, limit) => {
    return (page - 1) * limit;
};
exports.getOffsetPagination = getOffsetPagination;
const getHasMoreInfiniteScroll = (data, limit, isAll) => {
    if (isAll)
        return false;
    let hasMore = true;
    if (data.length <= limit) {
        hasMore = false;
    }
    else {
        data.pop();
    }
    return hasMore;
};
exports.getHasMoreInfiniteScroll = getHasMoreInfiniteScroll;
const calculatePages = (page, limit, total) => {
    return {
        hasMore: page * limit < total,
        totalPages: Math.ceil(total / limit),
    };
};
exports.calculatePages = calculatePages;
