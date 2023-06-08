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
import { Bar } from 'react-chartjs-2';


const BarChart = ({ data, options }) => {
    return (
        <div style={{ width: '90%' }}>
            <div>Bar chart</div>
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarChart