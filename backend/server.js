const express = require('express');
const app = express();
const port = 3002;
const cors = require('cors');
const HOME_REGION = require('../../src/config.json').HOME_REGION;
app.use(cors());
app.use(express.static(__dirname.concat('/build')));


const {TimestreamQueryClient, QueryCommand} = require("@aws-sdk/client-timestream-query");
const {TimestreamWriteClient, ListTablesCommand} = require("@aws-sdk/client-timestream-write");
const writeClient = new TimestreamWriteClient({region: HOME_REGION});
const queryClient = new TimestreamQueryClient({region: HOME_REGION});

const createRegions = require('./utils/createRegions.js');
const createFormatedCalls = require('./utils/createFormatedCalls.js');
const getTests = require('./utils/getTests.js');

// takes in a list of region tables and returns an object with all the formated data from each table
// this is then sent to the frontend to be displayed
async function writeData(regions, aggTime) {
	const regionObject = {}
	for (let i = 0; i < regions.length; i++) {
		let region = regions[i];
		const testsResponse = await getTests(region, queryClient, QueryCommand);
    const formatedCalls = await createFormatedCalls(region, queryClient, QueryCommand);
    regionObject[region] = {
      rawTests: testsResponse,
      calls: formatedCalls,
    }
  }
  return regionObject
}

// serve static files
app.get('/', (req, res) => {
  res.sendFile('../build/index.html');
});

// is the endpoint that the frontend calls to get the data
app.get('/data', async (req, res) => {
  const aggTime = Number(req.query.time);
  const params = {
    DatabaseName: "constellation-timestream-db",
  };
  const command = new ListTablesCommand(params);
  const regionsRaw = await writeClient.send(command)
  const regions = createRegions(regionsRaw);
  const regionObject = await writeData(regions, aggTime);

  regions.push("All Regions");
  regions.push("Consolidated");
  regionObject["regions"] = regions;
  res.send(regionObject);
})

// start express server on port 3002
app.listen(port, () => {
  console.log(`Constellation visualizer app ready at http://localhost:${port}/`);
});
