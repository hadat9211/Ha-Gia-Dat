export const getOffsetPagination = (page: number, limit: number) => {
  return (page - 1) * limit;
};

export const getHasMoreInfiniteScroll = <T>(data: T[], limit: number, isAll?: boolean) => {
  if (isAll) return false;

  let hasMore = true;

  if (data.length <= limit) {
    hasMore = false;
  } else {
    data.pop();
  }

  return hasMore;
};

export const calculatePages = (page: number, limit: number, total: number) => {
  return {
    hasMore: page * limit < total,
    totalPages: Math.ceil(total / limit),
  };
};
