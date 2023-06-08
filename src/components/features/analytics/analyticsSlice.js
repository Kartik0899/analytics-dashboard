import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuthToken } from '../auth/authAPI';
import { getDateRangeAPI } from './analyticsAPI';

export const getDateRange = createAsyncThunk(
    'analytics/getDateRange',
    async (_, { rejectWithValue }) => {
        try {
            const authToken = getAuthToken();

            const payload = {
                organization: 'DemoTest',
                view: 'Auction',
            };

            const response = await getDateRangeAPI(payload, authToken);

            // if (response.status === 401) {
            //     throw new Error('Unauthorized');
            // }

            // if (!response.ok) {
            //     throw new Error('Failed to fetch date range');
            // }

            // const data = await response.json();
            // console.log('analytics slice response->', response);

            // return response;

            return {
                startDate: response.startDate,
                endDate: response.endDate,
            };


        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const analyticsSlice = createSlice({
    name: 'analytics',
    initialState: {
        startDate: null,
        endDate: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDateRange.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDateRange.fulfilled, (state, action) => {
                state.loading = false;
                state.startDate = action.payload.startDate;
                state.endDate = action.payload.endDate;
            })
            .addCase(getDateRange.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default analyticsSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';
// import { getDateRangeAPI, getDateRangeAsync } from './analyticsAPI';

// const initialState = {
//     startDate: null,
//     endDate: null,
//     isLoading: false,
//     error: null,
// };

// const analyticsSlice = createSlice({
//     name: 'analytics',
//     initialState,
//     reducers: {
//         getDateRangeStart: (state) => {
//             state.isLoading = true;
//             state.error = null;
//         },
//         getDateRangeSuccess: (state, action) => {
//             state.isLoading = false;
//             state.startDate = action.payload.startDate;
//             state.endDate = action.payload.endDate;
//         },
//         getDateRangeFailure: (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//         },
//     },
// });

// export const { getDateRangeStart, getDateRangeSuccess, getDateRangeFailure } = analyticsSlice.actions;

// export const getDateRange = () => async (dispatch) => {
//     try {
//         dispatch(getDateRangeStart());
//         const dateRange = await getDateRangeAPI();
//         dispatch(getDateRangeSuccess(dateRange));
//     } catch (error) {
//         dispatch(getDateRangeFailure(error.message));
//     }
// };

// export default analyticsSlice.reducer;
