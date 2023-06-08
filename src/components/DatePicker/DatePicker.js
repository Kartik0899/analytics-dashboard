// DatePicker.js

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ startDate, endDate, selectedStartDate, selectedEndDate, handleStartDateChange, handleEndDateChange }) => {
    const handleDateSelection = (date) => {
        if (selectedStartDate && !selectedEndDate) {
            if (date < selectedStartDate) {
                handleStartDateChange(date);
                handleEndDateChange(null);
            } else {
                handleEndDateChange(date);
            }
        } else {
            handleStartDateChange(date);
            handleEndDateChange(null);
        }
    };

    return (
        <div>
            <DatePicker
                selected={selectedStartDate}
                onChange={handleDateSelection}
                selectsStart
                startDate={selectedStartDate}
                endDate={selectedEndDate}
                minDate={startDate}
                maxDate={endDate}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select a start date"
            />
            <DatePicker
                selected={selectedEndDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={selectedStartDate}
                endDate={selectedEndDate}
                minDate={startDate}
                maxDate={endDate}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select an end date"
            />
        </div>
    );
};

export default CustomDatePicker;
