import axios from "axios";

export default class Client {
  constructor(token) {
    this.token = token;
    this.url = "http://3.145.62.145:4000"; // Added 'http://' before the IP address
    this.client = axios.create({
      baseURL: this.url,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.client.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
    this.client.interceptors.response.use(
      (res) => res,
      (err) => {
        return Promise.reject(err);
      }
    );
  }

  get(url) {
    return this.client.get(url);
  }
  post(url, payload) {
    return this.client.post(url, payload);
  }

  put(url, payload) {
    return this.client.put(url, payload);
  }

  postFormData(url, payload) {
    // Modified the way of setting headers for FormData
    const formDataHeaders = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return this.client.post(url, payload, formDataHeaders);
  }
}
