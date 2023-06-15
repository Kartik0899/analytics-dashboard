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