import axios from "axios";

const request = async (metodo, options) => {
    const headers = options.headers || {
        "Content-type": 'application/json',
    };

    try {
        const response = await axios({
            method: metodo,
            url: options.url,
            data: options.data,
            headers: headers
        });

        if (options.callback != null) {
            options.callback(response.data, response.status);
        }

        return response.data;
    } catch (error) {
        if (options.errorCallback != null) {
            options.errorCallback(error);
        }
        console.error(error);
        return error;
    }
};


const postRequest = async(options) => {
    return await request('post', options);
}

export default {
    postRequest
}