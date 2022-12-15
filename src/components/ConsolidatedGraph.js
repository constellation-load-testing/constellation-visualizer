import {useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useContext } from 'react';
import { appContext } from '../App';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function ConsolidatedGraph() {
  let { data, regions } = useContext(appContext);
  regions = regions.slice(0, regions.length - 2);
  const options =  { 
    scales: {
      yAxes: {
        title: {
          display: true,
          text: "Milliseconds",
          font: {
            size: 15
          }
        },
        ticks: {
          precision: 0
        },
      },
      xAxes: {
        title: {
          display: true,
          text: "Time",
          font: {
            size: 15
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: "Consolidated Regional Latency Graph",
      },
    }
  }
  const colors = {
    0: 'rgba(255, 99, 132, 0.8)',
    1: 'rgba(99, 162, 235, 0.8)',
    2: 'rgba(255, 206, 29, 0.8)',
    3: 'rgba(75, 192, 100, 0.8)',
    4: 'rgba(255, 102, 255, 0.8)',
    5: 'rgba(39, 159, 64, 0.8)',
    6: 'rgba(255, 66, 132, 0.8)',
    7: 'rgba(54, 50, 235, 0.8)',
    8: 'rgba(255, 206, 3, 0.8)',
    9: 'rgba(75, 192, 192, 0.8)',
    10: 'rgba(153, 102, 255, 0.8)',
    11: 'rgba(46, 159, 64, 0.8)',
    12: 'rgba(255, 22, 132, 0.8)',
    13: 'rgba(54, 100, 235, 0.8)',
    14: 'rgba(255, 206, 200, 0.8)',
    15: 'rgba(192, 192, 192, 0.8)',
    16: 'rgba(153, 39, 255, 0.8)',
    17: 'rgba(200, 159, 64, 0.8)',
    18: 'rgba(255, 5, 132, 0.8)',
    19: 'rgba(54, 99, 235, 0.8)',
    20: 'rgba(255, 206, 86, 0.8)',
    21: 'rgba(75, 39, 192, 0.8)',
    22: 'rgba(50, 102, 255, 0.8)',
    23: 'rgba(29, 159, 64, 0.8)',
    24: 'rgba(255, 230, 132, 0.8)',
    25: 'rgba(54, 4, 235, 0.8)'
  };
  const datasets = regions.map((region, i) => {
    let color = colors[i];
    return {
      label: region,
      data: data[region].tests.map(d => d.runtime),
      fill: false,
      backgroundColor: color,
      borderColor: color,
    }
  })
  const labels = data[regions[0]].tests.map(d => d.time);
  const lineGraphData = {
    labels,
    datasets: datasets
  }
  return <Line options={options} data={lineGraphData} /> 
}
export default ConsolidatedGraph;
