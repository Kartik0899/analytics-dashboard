import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthToken } from '../auth/authAPI';
import axios from 'axios';


export const getTableData = createAsyncThunk(
    'charts/getTableData',
    async () => {

        const authToken = getAuthToken();

        const payload = {
            _id: "dashboard1516252439345",
            emailId: "candidate@sigmoid.com",
            orgViewReq: {
                organization: "DemoTest",
                view: "Auction",
            },
            chartObject: {
                metadata: {
                    title: "chartobject:1516252439345",
                    img_thumbnail: "../img/chart.png",
                    chartType: "table",
                    dataLimit: 50,
                },
                requestParam: {
                    granularity: "hour",
                    timeZone: {
                        name: "UTC (+00:00)",
                        location: "UTC",
                    },
                    dateRange: {
                        startDate: "1493337600000",
                        endDate: "1493510400000",
                    },
                    xAxis: ["D044"],
                    yAxis: ["M002"],
                    approxCountDistinct: [],
                    specialCalculation: [],
                    filter: [],
                    orderBy: {
                        metricOrdByList: [
                            {
                                id: "M002",
                                desc: true,
                            },
                        ],
                    },
                    percentCalList: [],
                },
            },
        };

        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': authToken,
        }

        const { data } = await axios.post('https://sigviewauth.sigmoid.io/api/v1/getData', payload, {
            headers: headers
        })

        return data.result;
    }
);

export const getBarData = createAsyncThunk(
    'charts/getBarData',
    async () => {
        const authToken = getAuthToken();

        const payload = {
            "_id": "dashboard1516252235693",
            "emailId": "candidate@sigmoid.com",
            "orgViewReq": {
                "organization": "DemoTest",
                "view": "Auction"
            },
            "chartObject": {
                "metadata": {
                    "title": "chartobject:1516252235693",
                    "img_thumbnail": "../img/chart.png",
                    "chartType": "bar",
                    "dataLimit": 50
                },
                "requestParam": {
                    "granularity": "hour",
                    "timeZone": {
                        "name": "UTC (+00:00)",
                        "location": "UTC"
                    },
                    "dateRange": {
                        "startDate": "1493337600000",
                        "endDate": "1493510400000"
                    },
                    "xAxis": [
                        "D017"
                    ],
                    "yAxis": [
                        "M002"
                    ],
                    "approxCountDistinct": [],
                    "specialCalculation": [],
                    "filter": [],
                    "orderBy": {
                        "metricOrdByList": [
                            {
                                "id": "M002",
                                "desc": true
                            }
                        ]
                    },
                    "percentCalList": []
                }
            }
        };

        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': authToken,
        }

        const { data } = await axios.post('https://sigviewauth.sigmoid.io/api/v1/getData', payload, {
            headers: headers
        })

        return data.result;

    }
);

export const getPieData = createAsyncThunk(
    'charts/getPieData',
    async () => {
        const authToken = getAuthToken();

        const payload = {
            "_id": "Datastory_ChartId_1535224664111",
            "emailId": "candidate@sigmoid.com",
            "orgViewReq": {
                "organization": "DemoTest",
                "view": "Auction"
            },
            "chartObject": {
                "metadata": {
                    "title": "",
                    "img_thumbnail": "images/pie.png",
                    "chartType": "pie",
                    "dataLimit": 500
                },
                "text": [],
                "requestParam": {
                    "granularity": "hour",
                    "timeZone": {
                        "name": "UTC (+00:00)",
                        "location": "UTC"
                    },
                    "dateRange": {
                        "startDate": "1493424000000",
                        "endDate": "1493596800000"
                    },
                    "xAxis": [
                        "D005"
                    ],
                    "yAxis": [],
                    "approxCountDistinct": [],
                    "specialCalculation": [
                        "CM001"
                    ],
                    "filter": [],
                    "orderBy": {
                        "customMetricOrdByList": [
                            {
                                "id": "CM001",
                                "desc": true
                            }
                        ]
                    },
                    "percentCalList": [
                        {
                            "id": "CM001"
                        }
                    ]
                }
            }
        };
        const headers = {
            'Content-Type': 'application/json',
            'x-auth-token': authToken,
        }

        const { data } = await axios.post('https://sigviewauth.sigmoid.io/api/v1/getData', payload, {
            headers: headers
        })

        return data.result;

    }
);

const chartsSlice = createSlice({
    name: 'charts',
    initialState: {
        tableData: null,
        barData: null,
        pieData: null,
        tableLoading: false,
        barLoading: false,
        pieLoading: false,
        tableerror: null,
        barerror: null,
        pieerror: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTableData.pending, (state) => {
                state.tableLoading = true;
                state.tableerror = null;
                state.tableData = null;
            })
            .addCase(getTableData.fulfilled, (state, action) => {
                state.tableLoading = false;
                state.tableData = action.payload;
                state.tableerror = null;
            })
            .addCase(getTableData.rejected, (state, action) => {
                state.tableLoading = false;
                state.tableerror = action.error.message;
                state.tableData = null;
            })
            .addCase(getBarData.pending, (state) => {
                state.barLoading = true;
                state.barerror = null;
                state.barData = null;
            })
            .addCase(getBarData.fulfilled, (state, action) => {
                state.barLoading = false;
                state.barData = action.payload;
                state.barerror = null;
            })
            .addCase(getBarData.rejected, (state, action) => {
                state.barLoading = false;
                state.barerror = action.error.message;
                state.barData = null;
            })
            .addCase(getPieData.pending, (state) => {
                state.pieLoading = true;
                state.pieerror = null;
                state.pieData = null;
            })
            .addCase(getPieData.fulfilled, (state, action) => {
                state.pieLoading = false;
                state.pieData = action.payload;
                state.pieerror = null;
            })
            .addCase(getPieData.rejected, (state, action) => {
                state.pieLoading = false;
                state.pieerror = action.payload;
                state.pieData = null;
            })
    },
});

export default chartsSlice.reducer;
