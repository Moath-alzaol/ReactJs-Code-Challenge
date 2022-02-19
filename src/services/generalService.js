import { apiEndPoints } from "../api";
import { handleResponse } from "../utils/misc";
import { apiService } from "./ApiService";

class GeneralService {
    async getUsers() {
        try {
            const data = await apiService
                .api()
                .get(apiEndPoints.general.getUsers)
                .then(({ data }) => data);

            return handleResponse({ success: true, data: data });
        } catch ({ response }) {
            return handleResponse({ success: false, ...response?.data });
        }
    }
}

export const generalService = new GeneralService();
