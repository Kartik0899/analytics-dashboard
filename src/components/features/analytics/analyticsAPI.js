export const getDateRangeAPI = async (payload, authToken) => {
    const response = await fetch('https://sigviewauth.sigmoid.io/api/v1/getDateRange', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': authToken,
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch date range');
    }

    const data = await response.json();
    console.log('getDateRangeAPI', data.result);
    return data.result;
};