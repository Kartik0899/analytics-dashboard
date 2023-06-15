import React, { useState } from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.css';

const DateRangePickerComponent = ({ startDate, endDate, selectedStartDate, selectedEndDate, onDateRangeChange }) => {
    const handleDateRangeChange = (value) => {
        onDateRangeChange(value);
    };

    const handleDisabledDate = (date) => {
        return (date < startDate || date > endDate);
    };

    return (
        <DateRangePicker
            value={[selectedStartDate, selectedEndDate]}
            onChange={handleDateRangeChange}
            disabledDate={handleDisabledDate}
        />
    );
};

export default DateRangePickerComponent;
