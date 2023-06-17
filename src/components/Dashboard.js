import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BarChart from './Charts/BarChart';
import PieChart from './Charts/PieChart';
import TableComponent from './Charts/table';
import DateRangePickerComponent from './DatePicker/DateRangePicker';
import { getDateRange } from './features/analytics/analyticsSlice';
import { getBarData, getPieData, getTableData } from './features/analytics/chartsSlice';
import Navbar from './Navbar/Navbar';

const Dashboard = () => {

    const startDate = useSelector((state) => state.analytics.startDate);
    const endDate = useSelector((state) => state.analytics.endDate);

    const tableData = useSelector((state) => state.charts.tableData);
    const barData = useSelector((state) => state.charts.barData);
    const pieData = useSelector((state) => state.charts.pieData);
    const tableLoading = useSelector((state) => state.charts.tableLoading);
    const barLoading = useSelector((state) => state.charts.barLoading);
    const pieLoading = useSelector((state) => state.charts.pieLoading);
    const tableerror = useSelector((state) => state.charts.tableerror);
    const barerror = useSelector((state) => state.charts.barerror);
    const pieerror = useSelector((state) => state.charts.pieerror);

    const [showTable, setShowTable] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDateRange());
    }, [dispatch]);



    const formatEpochDate = (epoch) => {
        const date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(epoch);
        return date;
    };

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const handleDateRangeChange = (value) => {
        if (value) {
            setSelectedStartDate(value[0]);
            setSelectedEndDate(value[1]);
        } else {
            setSelectedStartDate(null);
            setSelectedEndDate(null);
        }
    };

    useEffect(() => {
        if (selectedStartDate !== null && selectedEndDate !== null) {
            dispatch(getTableData());
            dispatch(getBarData());
            dispatch(getPieData());
        }
    }, [selectedStartDate, selectedEndDate, dispatch]);



    const handleViewDashboard = () => {
        dispatch(getTableData())
        dispatch(getBarData())
        dispatch(getPieData())
        setShowTable(true);
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

    const PieChartlabels = pieData?.data.slice(0, 10).map((item) => item.advertiserId);

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


    const TableChartComponent = () => {
        if (tableLoading) {
            return (
                <>
                    <div role="status" className="animate-pulse">
                        <div className="h-20 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4">
                        </div>
                    </div>
                </>
            )
        } else if (tableData !== null) {
            return <TableComponent data={tableData.data} />
        }
        else if (tableerror !== null) {
            return <div className='p-4'>something went wrong in Table Data</div>
        }
        else {
            return <div>table</div>
        }
    }
    const BarChartComponent = () => {
        if (barLoading) {
            return (
                <>
                    <div role="status" className="animate-pulse">
                        <div className="h-20 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4">
                        </div>
                    </div>
                </>
            )
        } else if (barData !== null) {
            return <BarChart data={BarChartData} options={chartOptions} />
        }
        else if (barerror !== null) {
            return <div className='p-4'>something went wrong Bar Chart</div>
        }
        else {
            return <div>Bar</div>
        }
    }
    const PieChartComponent = () => {
        if (pieLoading) {
            return (
                <>
                    <div role="status" className="animate-pulse">
                        <div className="h-20 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4">
                        </div>
                    </div>
                </>
            )
        } else if (pieData !== null) {
            return <PieChart data={PieChartData} options={PieChartOptions} />
        }
        else if (pieerror !== null) {
            return <div className='p-4'>something went wrong in Pie Chart</div>
        }
        else {
            return <div>Pie</div>
        }
    }



    return (
        <div className='bg-gray-900 min-h-screen'>
            <Navbar />
            <section className="h-full">
                <div className="flex flex-col px-6 py-8 mx-auto lg:py-0">
                    <h2 className='text-white my-[3%] flex justify-center'>Welcome to the Dashboard !</h2>
                    {startDate && endDate ? (
                        <>
                            <div className='flex items-center mb-[2%] text-white text-xl'>
                                <div className='mr-4'>Start date: {formatEpochDate(startDate)}</div>
                                <div>End date: {formatEpochDate(endDate)}</div>
                            </div>

                            <div className='w-[20%] grid mb-[2%]'>
                            <div className='text-white mb-1'>Please select the date -</div>
                                <DateRangePickerComponent
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectedStartDate={selectedStartDate}
                                    selectedEndDate={selectedEndDate}
                                    onDateRangeChange={handleDateRangeChange}
                                />
                            </div>

                            <div className='flex items-center mb-[2%] text-white text-xl'>
                                <div className='mr-4'>Selected start date: {selectedStartDate ? formatEpochDate(selectedStartDate) : 'None'}</div>
                                <div>Selected end date: {selectedEndDate ? formatEpochDate(selectedEndDate) : 'None'}</div>
                            </div>

                            {selectedStartDate !== null && selectedEndDate !== null && (
                                <>
                                    <button type="button" onClick={handleViewDashboard} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[15%]">VIEW DASHBOARD</button>
                                </>
                            )}
                        </>
                    ) : (
                        <div role="status" className="max-w-sm animate-pulse">
                            <div className="h-20 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
                            <div className="h-20 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"></div>
                        </div>
                    )}

                    {
                        selectedStartDate !== null && selectedEndDate !== null && (
                            <>
                                {showTable ? (
                                    <>
                                        <TableChartComponent />
                                        // <div className='flex w-full mt-10'>
                                            <BarChartComponent />
                                            <PieChartComponent />
                                        // </div>
                                    </>
                                ) : (null)}
                            </>
                        )
                    }
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
