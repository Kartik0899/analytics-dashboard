import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';


const PieChart = ({ data, options }) => {
    return (
        <div style={{ width: '50%' }}>
            <div>Pie chart</div>
            <Pie data={data} options={options} />
        </div>
    )
}

export default PieChart;