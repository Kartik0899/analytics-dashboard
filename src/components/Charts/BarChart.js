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
        <div className='w-[70%] border-r-2 p-3'>
            <div className='flex items-center my-[2%] text-white text-xl'>Bar chart -</div>
            <Bar data={data} options={options} />
        </div>
    )
}

export default BarChart