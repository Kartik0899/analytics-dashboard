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
import { signIn } from './features/auth/authSlice';

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);
    const startDate = useSelector((state) => state.analytics.startDate);
    const endDate = useSelector((state) => state.analytics.endDate);
    const loading = useSelector((state) => state.analytics.loading);

    const tableData = useSelector((state) => state.charts.tableData);
    const barData = useSelector((state) => state.charts.barData);
    const pieData = useSelector((state) => state.charts.pieData);

    const [showTable, setShowTable] = useState(false);



    const dispatch = useDispatch();

    console.log('tableData', tableData, 'barData', barData, 'pieData', pieData);


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
                text: 'Chart.js Line Chart',
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
                text: 'Pie Chart',
            },
        },
    };


    return (
        <div>
            <h2>Welcome, {user.username}!</h2>
            {startDate && endDate ? (
                <>
                    <div>
                        <p>Start date: {formatEpochDate(startDate)}</p>
                        <p>End date: {formatEpochDate(endDate)}</p>
                    </div>

                    <DateRangePickerComponent
                        startDate={startDate}
                        endDate={endDate}
                        selectedStartDate={selectedStartDate}
                        selectedEndDate={selectedEndDate}
                        onDateRangeChange={handleDateRangeChange}
                    />
                    {/* <DateRangePicker
                        startDate={selectedStartDate}
                        endDate={selectedEndDate}
                        onDateRangeChange={handleDateRangeChange}
                    /> */}


                    <p>Selected start date: {selectedStartDate ? formatEpochDate(selectedStartDate) : 'None'}</p>
                    <p>Selected end date: {selectedEndDate ? formatEpochDate(selectedEndDate) : 'None'}</p>



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
                        <button onClick={handleViewDashboard}>VIEW DASHBOARD</button>
                    )}
                </>
            ) : (
                <p>Loading date range...</p>
            )}
            {/* Add your other dashboard components and visualizations here */}

            {/* Need to work on the charts showing when there is no date selected */}
            {showTable && tableData && (
                <>
                    <TableComponent data={tableData.data} />
                    <BarChart data={BarChartData} options={chartOptions} />
                    <PieChart data={PieChartData} options={PieChartOptions} />
                </>
            )}
        </div>
    );
};

export default Dashboard;
