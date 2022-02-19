import axios from "axios";

class ApiService {
    baseURL = "https://jsonplaceholder.typicode.com/";
    api() {
        return axios.create({ baseURL: this.baseURL });
    }
}

export const apiService = new ApiService();
