
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartLineGraph = () => {
  // Data for the line graph
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // X-axis labels
    datasets: [
      {
        label: 'Sales Over Time',
        data: [1200, 1900, 3000, 5000, 2000, 3000, 4000, 4500, 3200, 4100, 3800, 4900], // Data points for Y-axis
        borderColor: 'lightblue', 
        backgroundColor: 'rgba(173, 216, 230, 0.2)', 
        pointBackgroundColor: 'lightblue',
        tension: 0.60, 
        fill: true, 
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true, 
    aspectRatio: 2, 
    plugins: {
      legend: {
        position: 'top', 
      },
      title: {
        display: true,
        text: 'Sales Over the Year', 
      },
    },
    scales: {
      x: {
        grid: {
          display: false, 
        },
      },
      y: {
      
        beginAtZero: true, 
      },
    },
  };

  return (
    <div className="p-2 bg-white rounded-lg  mt-12" style={{ width: '100%', height: '620px' }}>
      <h2 className="text-xl font-bold mb-4">Sales Data</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartLineGraph;
