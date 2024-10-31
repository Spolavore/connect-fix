// composables/useRequest.js
import axios from "axios";

const request = async (method, options) => {
  const headers = options.headers || {
    "Content-type": 'application/json',
  };

  try {
    const response = await axios({
      method: method,
      url: options.url,
      data: options.data,
      headers: headers,
    });

    if (options.callback) {
      options.callback(response.data, response.status);
    }

    return response.data;
  } catch (error) {
    if (options.errorCallback) {
      options.errorCallback(error);
    }
    console.error(error);
    return error;
  }
};

const postRequest = async (options) => await request('post', options);
const getRequest = async (options) => await request('get', options);

export default {
  postRequest,
  getRequest
}
