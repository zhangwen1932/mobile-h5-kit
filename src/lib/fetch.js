/* eslint-disable no-undef */
import qs from 'qs';
import '../assets/lib/fetch';
import token from './token';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const { status, statusText } = response;
  throw new Error(`[${status}] ${statusText}`);
}

function parseJSON(response) {
  return response.json();
}

function processData(data) {
  if (data.code === 401) {
    localStorage.clear();
    // Toast.show({
    //   icon: 'fail',
    //   content: '您的登录已经过期',
    // });
  }
  return data;
}

function catchError(error) {
  if (error.message.slice(1, 4) !== '401') console.log(error.message);
  return {
    success: false,
  };
}

const fetchlib = window.fetch;

const headers = {
  'Content-Type': 'application/json',
  token: token.get() || undefined,
};

// console.log('token.get()', token.get());
// if (token.get()) {
//   // TODO: 是否需要放置Authorization
//   headers.token =
// }

const fetch = {
  post(url, data, options = {}, form = false) {
    const currentUrl = __ENV__ + url;
    let body;
    if (form) {
      body = data;
    } else {
      body = JSON.stringify({
        // utf8: '✓',
        ...data,
      });
    }
    return fetchlib(currentUrl, {
      headers: {
        'Content-Type': 'application/json',
        token: token.get() || undefined,
      },
      ...options,
      body,
      method: 'POST',
      credentials: 'include',
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(processData)
      .catch(catchError);
  },
  put(url, data, options = {}, form = false) {
    const currentUrl = __ENV__ + url;
    let body;
    if (form) {
      body = data;
    } else {
      body = JSON.stringify({
        // utf8: '✓',
        ...data,
      });
    }
    return fetchlib(currentUrl, {
      headers,
      ...options,
      body,
      method: 'PUT',
      credentials: 'include',
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(processData)
      .catch(catchError);
  },
  delete(url, options = {}) {
    const currentUrl = __ENV__ + url;
    return fetchlib(currentUrl, {
      headers,
      ...options,
      method: 'DELETE',
      credentials: 'include',
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(processData)
      .catch(catchError);
  },
  get(url, data, options = {}) {
    let queryUrl = url;
    const params = data ? qs.stringify({ ...data, locale: window.locale }, { arrayFormat: 'brackets' }) : qs.stringify({ locale: window.locale });
    queryUrl += '?' + params;
    const currentUrl = __ENV__ + queryUrl;
    return fetchlib(currentUrl, {
      headers: {
        'Content-Type': 'application/json',
        token: token.get() || undefined,
      },
      credentials: 'include',
      ...options,
      method: 'GET',
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(processData)
      .catch(catchError);
  },
  cleanGet(url) {
    const currentUrl = __ENV__ + url;
    return fetchlib(currentUrl, {
      headers: {},
      method: 'GET',
    })
      .then(checkStatus)
      .then(parseJSON);
  },
};

export default fetch;
