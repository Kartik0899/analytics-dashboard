// chartsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthToken } from '../auth/authAPI';
import { getBarDataAPI, getPieDataAPI, getTableDataAPI } from './analyticsActions';


export const getTableData = createAsyncThunk(
    'charts/getTableData',
    async () => {
        try {
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

            const response = await getTableDataAPI(payload, authToken);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getBarData = createAsyncThunk(
    'charts/getBarData',
    async () => {
        try {
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
            const response = await getBarDataAPI(payload, authToken);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getPieData = createAsyncThunk(
    'charts/getPieData',
    async () => {
        try {
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
            const response = await getPieDataAPI(payload, authToken);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
);

const chartsSlice = createSlice({
    name: 'charts',
    initialState: {
        tableData: null,
        barData: null,
        pieData: null,
        chartLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTableData.pending, (state) => {
                state.chartLoading = true;
                state.error = null;
            })
            .addCase(getTableData.fulfilled, (state, action) => {
                state.chartLoading = false;
                state.tableData = action.payload;
            })
            .addCase(getTableData.rejected, (state, action) => {
                state.chartLoading = false;
                state.error = action.payload;
            })
            .addCase(getBarData.pending, (state) => {
                state.chartLoading = true;
                state.error = null;
            })
            .addCase(getBarData.fulfilled, (state, action) => {
                state.chartLoading = false;
                state.barData = action.payload;
            })
            .addCase(getBarData.rejected, (state, action) => {
                state.chartLoading = false;
                state.error = action.payload;
            })
            .addCase(getPieData.pending, (state) => {
                state.chartLoading = true;
                state.error = null;
            })
            .addCase(getPieData.fulfilled, (state, action) => {
                state.chartLoading = false;
                state.pieData = action.payload;
            })
            .addCase(getPieData.rejected, (state, action) => {
                state.chartLoading = false;
                state.error = action.payload;
            })
    },
});

// export const {
//     fetchChartsDataStart,
//     fetchChartsDataSuccess,
//     fetchChartsDataFailure,
// } = chartsSlice.actions;

export default chartsSlice.reducer;
