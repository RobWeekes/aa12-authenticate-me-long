// frontend/src/store/csrf.js

// QUESTION - DO WE NEED TO IMPORT FILES FROM REDUX HERE ??

import Cookies from 'js-cookie';

// Configure the API base URL to handle both development and production environments
const baseUrl = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://localhost:8000/api';

// Then modify your csrfFetch function to use this baseUrl
export async function csrfFetch(url, options = {}) {
  // Add baseUrl to the beginning of the url if it doesn't start with http
  const fullUrl = url.startsWith('http') ? url : baseUrl + url;
  // set options.method to 'GET' if there is no method set
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there are no headers
  options.headers = options.headers || {};

  // if the options.method is not 'GET', then set the "Content-Type" header to
  // "application/json", and set the "XSRF-TOKEN" header to the value of the
  // "XSRF-TOKEN" cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] =
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }
  // call the default window's fetch with the url and the options passed in
  const res = await window.fetch(fullUrl, options);
  // const res = await window.fetch(url, options);

  // if the response status code is 400 or above, then throw an error with the
  // error being the response
  if (res.status >= 400) throw res;

  // if the response status code is under 400, then return the response to the
  // next promise chain
  return res;
}

// added below for phase 0 of frontend readme
// in the React frontend, this GET /api/csrf/restore route needs to be called when the app is loaded.
// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
  return csrfFetch('/api/csrf/restore');
}
