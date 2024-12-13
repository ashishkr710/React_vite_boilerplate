import axios from "axios";
import querystring from "querystring";
import envConfig from "../environment/index";

const headers = {
  "Content-Type": "multipart/form-data",
};

const API_URL = `${envConfig.apiUrl}`; // End point

class ApiClient {
  static post(url: string, params: object, dispatch: any) {
    return new Promise((fulfill, reject) => {
      axios
        .post(API_URL + url, params)
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  static get(url: string, params?: any, dispatch?: any) {
    url = API_URL + (params ? `${url}?${querystring.stringify(params)}` : url);
    return new Promise(function (fulfill, reject) {
      axios
        .get(url)
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  static search(url: string, params?: any, dispatch?: any) {
    url = API_URL + (params ? `${url}?${querystring.stringify(params)}` : url);
    return new Promise(function (fulfill, reject) {
      axios
        .get(url)
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  static put(url: string, params?: any, dispatch?: any) {
    return new Promise(function (fulfill, reject) {
      axios
        .put(API_URL + url, params)
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  static patch(url: string, params?: any, dispatch?: any) {
    return new Promise(function (fulfill, reject) {
      axios
        .patch(API_URL + url, params)
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  static _postFormData(url: string, params?: any, dispatch?: any) {
    return new Promise(function (fulfill, reject) {
      axios
        .post(API_URL + url, params, { headers: headers })
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  static _putFormData(url: string, params?: any, dispatch?: any) {
    return new Promise(function (fulfill, reject) {
      axios
        .put(API_URL + url, params, { headers: headers })
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  static _patchFormData(url: string, params?: any, dispatch?: any) {
    return new Promise(function (fulfill, reject) {
      axios
        .patch(API_URL + url, params, { headers: headers })
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  static _uploadFile(url: string, params?: any, dispatch?: any) {
    return new Promise(function (fulfill, reject) {
      axios
        .post(API_URL + url, params, { headers: headers })
        .then(function (response) {
          fulfill(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
}
export default ApiClient;
