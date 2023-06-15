
let authToken = '';

export const getAuthToken = () => authToken;

export const signInAsync = async (payload) => {
    try {
        const response = await fetch('https://sigviewauth.sigmoid.io/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'framework': 'react'
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Failed to sign in');
        }

        const data = await response.json();
        authToken = data.token;

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
