import aggregateTests from "./aggregateTests";
function createFormattedTests(data, aggTime, toggleExclusion) {
  let len = data.regions.length - 2;
  for (let i = 0; i < len; i++) {
    const region = data.regions[i];
    data[region].tests = aggregateTests(data[region].rawTests, aggTime, toggleExclusion);
  }
  return {...data};
}

export default createFormattedTests;
