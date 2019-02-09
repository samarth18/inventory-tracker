export default items => {
  return items
    .map(item => item.netAmount)
    .reduce((sum, value) => sum + value, 0);
};
