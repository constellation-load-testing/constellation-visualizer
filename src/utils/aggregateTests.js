import createTime from './createTime';
function aggregateTests(testsResponse, aggTime, toggleExclusion) {
  aggTime = parseInt(aggTime);
  const formatedTests = [];
  let testsTracker = {
    total: 0,
    cummulative: 0
  };
  let trackedMilliseconds;
  const startExlusion = toggleExclusion ? Math.floor(testsResponse.length * 0.02): 0;
  const excludedTests = testsResponse.slice(startExlusion);
  excludedTests.forEach((row, i) => {
    let millisecStamp = Date.parse(row[0])
    let timeToFormat = new Date(trackedMilliseconds);
    if (!trackedMilliseconds) {
      trackedMilliseconds = millisecStamp;
      testsTracker.total += 1;
      testsTracker.cummulative += row[1];
    } else if (millisecStamp >= trackedMilliseconds + (1000 * aggTime)) {
      formatedTests.push({
        time: createTime(timeToFormat),
        runtime: testsTracker.cummulative / testsTracker.total
      });
      trackedMilliseconds = millisecStamp;
      testsTracker = {
        total: 0,
        cummulative: 0
      };
      testsTracker.total += 1;
      testsTracker.cummulative += Number(row[1]);
    } else if (i+1 === testsResponse.length) {
      formatedTests.push({
        time: createTime(timeToFormat),
        runtime: testsTracker.cummulative / testsTracker.total
      });
      testsTracker = {
        total: 0,
        cummulative: 0
      };
    } 
  })
  return formatedTests;
}

export default aggregateTests;
