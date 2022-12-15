import {Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



function BarGraph (input, region) {

  const options =  { 
    scales: {
      yAxes: {
        title: {
          display: true,
          text: "Requests",
          font: {
            size: 15
          }
        },
        ticks: {
          precision: 0
        }
      },
      xAxes: {
        title: {
          display: true,
          text: "URL",
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
        text: region,
      },
    }
  }
  const urlLabels = Object.keys(input[region].calls);
  const okData = urlLabels.map((url) => input[region].calls[url].ok);
  const errorData = urlLabels.map((url) => input[region].calls[url].error);
  const data = {
    labels: urlLabels,
    datasets: [
      {
        label: 'OK',
        data: okData,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Error',
        data: errorData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  // const statusData = input[region].calls.map(d => d.status);
  return <Bar options={options} data={data} />;
}

export default BarGraph;
