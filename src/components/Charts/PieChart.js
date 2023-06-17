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
        <div className='lg:w-[40%] md:w-[70%] p-3'>
            <div className='flex items-center my-[2%] text-white text-xl'>Pie chart -</div>
            <Pie data={data} options={options} />
        </div>
    )
}

export default PieChart;
