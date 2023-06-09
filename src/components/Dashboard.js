import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BarChart from './Charts/BarChart';
import PieChart from './Charts/PieChart';
import TableComponent from './Charts/table';
import CustomDatePicker from './DatePicker/DatePicker';
import DateRangePickerComponent from './DatePicker/DateRangePicker';
import DateRangePicker from './DatePicker/DateRangePicker';
import { fetchChartsData } from './features/analytics/analyticsActions';
import { getDateRange } from './features/analytics/analyticsSlice';
import { getBarData, getPieData, getTableData } from './features/analytics/chartsSlice';
import { getAuthToken } from './features/auth/authAPI';
import { signIn, signOutSuccess } from './features/auth/authSlice';
import Navbar from './Navbar/Navbar';

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);
    // const userEmail = useSelector((state) => state.auth.email);

    // console.log('user ->',userEmail);
    const startDate = useSelector((state) => state.analytics.startDate);
    const endDate = useSelector((state) => state.analytics.endDate);
    // const loading = useSelector((state) => state.analytics.loading);

    const tableData = useSelector((state) => state.charts.tableData);
    const barData = useSelector((state) => state.charts.barData);
    const pieData = useSelector((state) => state.charts.pieData);

    const [showTable, setShowTable] = useState(false);



    const dispatch = useDispatch();

    // console.log('tableData', tableData, 'barData', barData, 'pieData', pieData);


    useEffect(() => {
        dispatch(getDateRange());
    }, [dispatch]);



    const formatEpochDate = (epoch) => {
        // const date = new Date(epoch / 1000);
        // return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

        const date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(epoch);
        // console.log('dateStr', date);
        return date;
    };

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    // console.log('selectedStartDate', selectedStartDate, 'sdfsdf', selectedEndDate);
    // const [loading, setLoading] = useState(false);

    const handleDateRangeChange = (value) => {
        if (value) {
            setSelectedStartDate(value[0]);
            setSelectedEndDate(value[1]);
        } else {
            setSelectedStartDate(null);
            setSelectedEndDate(null);
        }
        // setSelectedStartDate(value[0]);
        // setSelectedEndDate(value[1]);
    };

    const handleViewDashboard = () => {
        console.log('button clicked');
        dispatch(getTableData())
        dispatch(getBarData())
        dispatch(getPieData())

        // setLoading(true);
        setShowTable(true);
        // setLoading(false);
    };

    const BarChartlabels = barData?.data.map((item) => item.appSiteId);

    const BarChartvalues = barData?.data.map((item) => parseInt(item.impressions_offered));

    const BarChartData = {
        labels: BarChartlabels,
        datasets: [
            {
                label: "impressions_offered",
                data: BarChartvalues,
                borderColor: 'skyblue',
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                // text: 'Bar Chart',
            },
        },
    };

    // const PieChartlabels = pieData?.data.slice(0, 10).map((item) => item.advertiserId);
    // const PieChartvalues = pieData?.data.slice(0, 10).map((item) => parseInt(item.CM001));
    const PieChartlabels = pieData?.data.map((item) => item.advertiserId);

    const PieChartvalues = pieData?.data.map((item) => parseInt(item.CM001));

    const PieChartData = {
        labels: PieChartlabels,
        datasets: [
            {
                label: "CM001",
                data: PieChartvalues,
                borderColor: 'skyblue',
                backgroundColor: [
                    'skyblue',
                    'orange',
                    'green',
                    'purple',
                    'pink',
                    'yellow',
                    'red',
                ],
            },
        ],
    };

    const PieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                // text: 'Pie Chart',
            },
        },
    };


    return (
        <div>
            <Navbar />
            <section className="bg-gray-50 dark:bg-gray-900 h-full">
                <div className="flex flex-col px-6 py-8 mx-auto lg:py-0">
                    <h2 className='text-white my-[3%] flex justify-center'>Welcome to the Dashboard {user.username}!</h2>
                    {startDate && endDate ? (
                        <>
                            <div className='flex items-center mb-[2%] text-white text-xl'>
                                <div className='mr-4'>Start date: {formatEpochDate(startDate)}</div>
                                <div>End date: {formatEpochDate(endDate)}</div>
                            </div>

                            <div className='w-[20%] grid mb-[2%]'>
                                <DateRangePickerComponent
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectedStartDate={selectedStartDate}
                                    selectedEndDate={selectedEndDate}
                                    onDateRangeChange={handleDateRangeChange}
                                />
                            </div>
                            {/* <DateRangePicker
                        startDate={selectedStartDate}
                        endDate={selectedEndDate}
                        onDateRangeChange={handleDateRangeChange}
                    /> */}


                            <div className='flex items-center mb-[2%] text-white text-xl'>
                                <div className='mr-4'>Selected start date: {selectedStartDate ? formatEpochDate(selectedStartDate) : 'None'}</div>
                                <div>Selected end date: {selectedEndDate ? formatEpochDate(selectedEndDate) : 'None'}</div>
                            </div>


                            {/* <CustomDatePicker
                        startDate={startDate}
                        endDate={endDate}
                        // handleDateChange={handleDateRangeChange}
                        selectedStartDate={selectedStartDate}
                        selectedEndDate={selectedEndDate}
                        handleStartDateChange={setSelectedStartDate}
                        handleEndDateChange={setSelectedEndDate}
                        onDateRangeChange={handleDateRangeChange}
                    /> */}
                            {selectedStartDate !== null && selectedEndDate !== null && (
                                <>
                                    {/* <button onClick={handleViewDashboard}>VIEW DASHBOARD</button> */}
                                    <button type="button" onClick={handleViewDashboard} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[15%]">VIEW DASHBOARD</button>
                                </>
                            )}
                        </>
                    ) : (

                        <div role="status" className="max-w-sm animate-pulse">
                            <div className="h-20 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
                            <div className="h-20 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
                        </div>

                    )}

                    {/* Need to work on the charts showing when there is no date selected */}
                    {/* {
                        loading ? (
                            <div role="status" className="max-w-sm animate-pulse">
                                <div className="h-20 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
                                <div className="h-20 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>

                            </div>
                        ) : ( */}
                    {showTable && tableData && (
                        <>
                            <div>
                                <TableComponent data={tableData.data} />
                                <BarChart data={BarChartData} options={chartOptions} />
                                <PieChart data={PieChartData} options={PieChartOptions} />
                            </div>
                        </>
                    )
                    }


                    {/* {showTable && tableData && (
                        <>
                            <TableComponent data={tableData.data} />
                            <BarChart data={BarChartData} options={chartOptions} />
                            <PieChart data={PieChartData} options={PieChartOptions} />
                        </>
                    )} */}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
