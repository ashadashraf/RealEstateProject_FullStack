export const constructApiUrl = (endpoint) => {
    // const commonApi = 'http://127.0.0.1:8000';
    const commonApi = 'https://www.realestatebackend.ashadashraf.com';
    return `${commonApi}/${endpoint}`;
};