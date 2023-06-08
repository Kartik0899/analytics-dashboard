
let authToken = '';

export const getAuthToken = () => authToken;



export const signInAsync = async (payload) => {
    try {
        const response = await fetch('https://sigviewauth.sigmoid.io/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Failed to sign in');
        }

        const data = await response.json();
        authToken = data.token;
        // console.log('authToken', authToken);
        // authToken = response.headers.get('authorization');

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
