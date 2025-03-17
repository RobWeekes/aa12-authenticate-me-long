// frontend/src/store/csrf.js

// QUESTION - DO WE NEED TO IMPORT FILES FROM REDUX HERE ??

// import Cookies from 'js-cookie';

// // Configure the API base URL to handle both development and production environments
// const baseUrl = process.env.NODE_ENV === 'production'
//   ? '/api'
//   : 'http://localhost:8000/api';

// // Then modify your csrfFetch function to use this baseUrl
// export async function csrfFetch(url, options = {}) {
//   // Add baseUrl to the beginning of the url if it doesn't start with http
//   const fullUrl = url.startsWith('http') ? url : baseUrl + url;
//   // set options.method to 'GET' if there is no method set
//   options.method = options.method || 'GET';
//   // set options.headers to an empty object if there are no headers
//   options.headers = options.headers || {};

//   // if the options.method is not 'GET', then set the "Content-Type" header to
//   // "application/json", and set the "XSRF-TOKEN" header to the value of the
//   // "XSRF-TOKEN" cookie
//   if (options.method.toUpperCase() !== 'GET') {
//     options.headers['Content-Type'] =
//       options.headers['Content-Type'] || 'application/json';
//     options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
//   }
//   // call the default window's fetch with the url and the options passed in
//   const res = await window.fetch(fullUrl, options);
//   // const res = await window.fetch(url, options);

//   // if the response status code is 400 or above, then throw an error with the
//   // error being the response
//   if (res.status >= 400) throw res;

//   // if the response status code is under 400, then return the response to the
//   // next promise chain
//   return res;
// }

// // added below for phase 0 of frontend readme
// // in the React frontend, this GET /api/csrf/restore route needs to be called when the app is loaded.
// // call this to get the "XSRF-TOKEN" cookie, should only be used in development
// export function restoreCSRF() {
//   return csrfFetch('/api/csrf/restore');
// }



// frontend/src/store/csrf.js
// import Cookies from 'js-cookie';

// // Configure the API base URL to handle both development and production environments
// // No need to add '/api' in production since we'll include it in the URL paths
// const baseUrl = process.env.NODE_ENV === 'production'
//   ? ''  // Empty string for production since we'll use relative paths
//   : 'http://localhost:8000';  // Just the base URL without '/api'

// // Then modify your csrfFetch function to use this baseUrl
// export async function csrfFetch(url, options = {}) {
//   // Add baseUrl to the beginning of the url if it doesn't start with http
//   const fullUrl = url.startsWith('http') ? url : baseUrl + url;
  
//   // set options.method to 'GET' if there is no method set
//   options.method = options.method || 'GET';
  
//   // set options.headers to an empty object if there are no headers
//   options.headers = options.headers || {};

//   // if the options.method is not 'GET', then set the "Content-Type" header to
//   // "application/json", and set the "XSRF-TOKEN" header to the value of the
//   // "XSRF-TOKEN" cookie
//   if (options.method.toUpperCase() !== 'GET') {
//     options.headers['Content-Type'] =
//       options.headers['Content-Type'] || 'application/json';
//     options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
//   }
  
//   // call the default window's fetch with the url and the options passed in
//   const res = await window.fetch(fullUrl, options);

//   // if the response status code is 400 or above, then throw an error with the
//   // error being the response
//   if (res.status >= 400) throw res;

//   // if the response status code is under 400, then return the response to the
//   // next promise chain
//   return res;
// }




// import Cookies from 'js-cookie';

// // Function to get CSRF token
// export async function restoreCSRF() {
//   try {
//     console.log('Fetching CSRF token...');
//     const response = await fetch('/api/csrf/restore', {
//       credentials: 'include' // Important for cookies
//     });
    
//     if (response.ok) {
//       const data = await response.json();
//       console.log('CSRF token received:', data['XSRF-Token']);
//       return data;
//     } else {
//       console.error('Failed to fetch CSRF token, status:', response.status);
//       throw new Error('Failed to fetch CSRF token');
//     }
//   } catch (error) {
//     console.error("Error restoring CSRF token:", error);
//     throw error;
//   }
// }

// // CSRF-protected fetch function
// export async function csrfFetch(url, options = {}) {
//   // Set options.method to 'GET' if there is no method
//   options.method = options.method || 'GET';
//   // Set options.headers to an empty object if there is no headers
//   options.headers = options.headers || {};
  
//   // Always include credentials
//   options.credentials = 'include';

//   // If the options.method is not 'GET', then set the "Content-Type" header to
//   // "application/json", and set the "XSRF-TOKEN" header to the value of the 
//   // "XSRF-TOKEN" cookie
//   if (options.method.toUpperCase() !== 'GET') {
//     options.headers['Content-Type'] = 
//       options.headers['Content-Type'] || 'application/json';
    
//     const csrfToken = Cookies.get('XSRF-TOKEN');
//     console.log('Using CSRF token for request:', csrfToken);
    
//     if (csrfToken) {
//       options.headers['XSRF-Token'] = csrfToken;
//     } else {
//       console.warn('No CSRF token found in cookies');
//       // Try to restore the CSRF token if it's missing
//       try {
//         await restoreCSRF();
//         const newToken = Cookies.get('XSRF-TOKEN');
//         if (newToken) {
//           console.log('Retrieved new CSRF token:', newToken);
//           options.headers['XSRF-Token'] = newToken;
//         } else {
//           console.error('Still no CSRF token after restore attempt');
//         }
//       } catch (error) {
//         console.error('Failed to restore CSRF token:', error);
//       }
//     }
//   }

//   console.log(`Making ${options.method} request to ${url} with headers:`, options.headers);
  
//   // Call the default window's fetch with the url and the options passed in
//   const res = await window.fetch(url, options);

//   // If the response status code is 400 or above, then throw an error with the
//   // error being the response
//   if (res.status >= 400) {
//     console.error(`Request failed with status ${res.status}:`, res);
//     throw res;
//   }

//   // If the response status code is under 400, then return the response to the
//   // next promise chain
//   return res;
// }

// // call this to get the "XSRF-TOKEN" cookie, should only be used in development
// export async function restoreCSRF() {
//   const response = await csrfFetch('/api/csrf/restore');
//   const data = await response.json();
//   return data;
// }



import Cookies from 'js-cookie';

// Function to get CSRF token
export async function restoreCSRF() {
  try {
    console.log('Fetching CSRF token...');
    const response = await fetch('/api/csrf/restore', {
      credentials: 'include' // Important for cookies
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('CSRF token received:', data['XSRF-Token']);
      return data;
    } else {
      console.error('Failed to fetch CSRF token, status:', response.status);
      throw new Error('Failed to fetch CSRF token');
    }
  } catch (error) {
    console.error("Error restoring CSRF token:", error);
    throw error;
  }
}

// CSRF-protected fetch function
export async function csrfFetch(url, options = {}) {
  // Make sure the URL is relative (starts with /)
  if (!url.startsWith('/')) {
    url = '/' + url;
  }
  
  // Set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // Set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};
  
  // Always include credentials
  options.credentials = 'include';

  // If the options.method is not 'GET', then set the "Content-Type" header to
  // "application/json", and set the "XSRF-TOKEN" header to the value of the 
  // "XSRF-TOKEN" cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = 
      options.headers['Content-Type'] || 'application/json';
    
    const csrfToken = Cookies.get('XSRF-TOKEN');
    console.log('Using CSRF token for request:', csrfToken);
    
    if (csrfToken) {
      options.headers['XSRF-Token'] = csrfToken;
    } else {
      console.warn('No CSRF token found in cookies');
      // Try to restore the CSRF token if it's missing
      try {
        await restoreCSRF();
        const newToken = Cookies.get('XSRF-TOKEN');
        if (newToken) {
          console.log('Retrieved new CSRF token:', newToken);
          options.headers['XSRF-Token'] = newToken;
        } else {
          console.error('Still no CSRF token after restore attempt');
        }
      } catch (error) {
        console.error('Failed to restore CSRF token:', error);
      }
    }
  }

  console.log(`Making ${options.method} request to ${url} with headers:`, options.headers);
  
  // Call the default window's fetch with the url and the options passed in
  const res = await window.fetch(url, options);

  // If the response status code is 400 or above, then throw an error with the
  // error being the response
  if (res.status >= 400) {
    console.error(`Request failed with status ${res.status}:`, res);
    throw res;
  }

  // If the response status code is under 400, then return the response to the
  // next promise chain
  return res;
}
