import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { format, isValid } from 'date-fns';
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
