import axios from "axios";

//You can set baseURL, withCredentials, and custom headers in one place.
//You can reuse the instance everywhere in your app.

// Create a custom Axios instance
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});
//withCredentials: true: Ensures that cookies are sent along with requests.
//(like your refresh token stored in an HttpOnly cookie)

// Response interceptor for handling token refresh
instance.interceptors.response.use(
  response => response,
  async error => {
    //Stores the original request that failed, so you can retry it later after refreshing the token.
    const originalRequest = error.config;

     // Avoid refresh loop
    if (originalRequest.url.includes('/auth/refresh-token')) {
      return Promise.reject(error);
    }

    //Checks if the error was a 401 (Unauthorized), meaning the access token likely expired.
    //Also checks if the request has not already been retried (to avoid infinite loops).
    if (error.response?.status === 401 && !originalRequest._retry) {
    //Marks the request as retried, so the interceptor won't try to refresh the token more than once for the same request.
      originalRequest._retry = true;

      try {
        const res = await instance.post('/auth/refresh-token', {}); // Use axios here
console.log('new access token:', res.data.accessToken);
        const newAccessToken = res.data.accessToken;
        if (!newAccessToken) {
          throw new Error("No access token returned");
        }

        //Updates the default headers for the Axios instance, so future requests include the new access token.
        instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        //Updates the original request’s headers, so the retried request uses the new access token.
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return instance(originalRequest); // Retry original request
      } catch (refreshError) {
        console.error('Token refresh error:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

