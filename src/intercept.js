import fetchIntercept from 'fetch-intercept';

export const unregister = fetchIntercept.register({
    request: function (url, config) {
        console.log('request');
        // Modify the url or config here
        return [url, config];
    },

    requestError: function (error) {
        console.log('requestError');
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        console.log('response');
        // Modify the reponse object
        return response;
    },

    responseError: function (error) {
        console.log('responseError');
        // Handle an fetch error
        return Promise.reject(error);
    }
});

