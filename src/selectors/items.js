import moment from "moment";

// Get visible items

export default (items, { text, sortBy, startDate, endDate }) => {
  return items
    .filter(item => {
      const createdAtMoment = moment(item.createdAt);
      const startDateMatch = startDate
        ? startDate.isSameOrBefore(createdAtMoment, "day")
        : true;
      const endDateMatch = endDate
        ? endDate.isSameOrAfter(createdAtMoment, "day")
        : true;
      const textMatch = item.description
        .toLowerCase()
        .includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "cost") {
        return a.netAmount < b.netAmount ? 1 : -1;
      }
    });
};
