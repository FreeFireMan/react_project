import fetchIntercept from 'fetch-intercept';

export const unregister = fetchIntercept.register({
    request: function (url, config) {
        console.log('request fetchIntercept');
        // Modify the url or config here
        return [url, config];
    },

    requestError: function (error) {
        console.log('requestError fetchIntercept');
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        console.log('response fetchIntercept');
        // Modify the reponse object
         if(response.status === 401){
            window.location.href = '/login';
         }
        return response;
    },

    responseError: function (error) {
        console.log('responseError fetchIntercept');
        // Handle an fetch error
        return Promise.reject(error);
    }
});

