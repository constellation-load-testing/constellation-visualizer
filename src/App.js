import './App.css';
import {useState, useEffect, useContext, createContext} from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';
import CreateGraphs from './components/CreateGraphs';
import LoadingBubble from './components/LoadingBubble';
import createFormattedTests from './utils/createFormattedTests';

export const appContext = createContext();

function App() {
	const [data, setData] = useState({regions: []});
  const [regions, setRegions] = useState([]);
  const [shownRegion, setShownRegion] = useState()
  const [aggTime, setAggTime] = useState("1");
  const [toggleExclusion, setToggleExclusion] = useState(true);

  useEffect(() => {
    if (!shownRegion && data.regions.length > 0) {
      setShownRegion(data.regions[data.regions.length - 1]);
    }
  })

  useEffect(() => {
    const dataToSet = createFormattedTests(data, aggTime, toggleExclusion);
    setData(dataToSet);
  }, [toggleExclusion])

  useEffect(() => {
    if (data.regions.length > 0) {
      const dataToSet = createFormattedTests(data, aggTime, toggleExclusion);
      setData(dataToSet);
    } else {
      axios.get(`http://localhost:3002/data?time=${aggTime}`)
        .then(result => {
          const dataToSet = createFormattedTests(result.data, aggTime, toggleExclusion);
          setData(dataToSet);
          setRegions(dataToSet.regions);
        })
    }
  }, [aggTime])
  
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
        integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
        crossOrigin="anonymous"
        />
      <appContext.Provider value={{data, setData, shownRegion, setShownRegion, aggTime, setAggTime, toggleExclusion, setToggleExclusion, regions}}>
        <header>
          <NavBar />
        </header>
        <div>
          {!shownRegion ? <LoadingBubble /> : <CreateGraphs />}
        </div>
      </appContext.Provider>
    </div>
  );
}

export default App;
