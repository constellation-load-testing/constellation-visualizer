import GraphCarousel from './GraphCarousel';
import ConsolidatedGraph from './ConsolidatedGraph';
import { useContext } from 'react';
import { appContext } from '../App';

const CreateGraphs = () => {
  const { shownRegion, data } = useContext(appContext);
  let slicedRegions = data.regions.slice(0, data.regions.length - 2);
  if (shownRegion == "Consolidated") {
    return (
      <div style={{paddingLeft: "10%",paddingTop: "1%",paddingRight: "10%",paddingBottom: "5%", justifyContent: "center"}}>
        <ConsolidatedGraph data={data} regions={slicedRegions} />
      </div>
    )
  } else if (shownRegion === 'All Regions') {
    return slicedRegions.map((region) => {
      return (
        <GraphCarousel key={region} region={region} data={data} />
      )
    })
  } else {
    return [shownRegion].map((region) => {
      return (
        <GraphCarousel key={region} region={region} data={data} />
      )
    })
  }
}

export default CreateGraphs
