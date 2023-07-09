export default async function withAxiosErrorHandling(callback: Function) {
    try {
        const res = await callback();
        return res.data;
    } catch (error: any) {
        let errorMessage = '';
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            errorMessage = error.response.data.message;
        } else if (error.request) {
            // The request was made but no response was received
            errorMessage = 'No response was received from the server.';
        } else {
            // Something happened in setting up the request that triggered an Error
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
}
