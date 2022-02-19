import { apiEndPoints } from "../api";
import { handleResponse } from "../utils/misc";
import { apiService } from "./ApiService";

class PostService {
    async getPosts() {
        try {
            const data = await apiService
                .api()
                .get(apiEndPoints.posts)
                .then(({ data }) => data);

            return handleResponse({ success: true, data: data });
        } catch ({ response }) {
            return handleResponse({ success: false, ...response?.data });
        }
    }

    async deletePost(id) {
        try {
            const data = await apiService
                .api()
                .delete(`${apiEndPoints.posts}/${id}`)
                .then(({ data }) => data);

            return handleResponse({ success: true, data: data });
        } catch ({ response }) {
            return handleResponse({ success: false, ...response?.data });
        }
    }

    async addPost(postData) {
        try {
            const data = await apiService
                .api()
                .post(`${apiEndPoints.posts}`, { ...postData })
                .then(({ data }) => data);

            return handleResponse({ success: true, data: data });
        } catch ({ response }) {
            return handleResponse({ success: false, ...response?.data });
        }
    }

    async updatePost(postData, postId) {
        try {
            const data = await apiService
                .api()
                .put(`${apiEndPoints.posts}/${postId}`, { ...postData })
                .then(({ data }) => data);

            return handleResponse({ success: true, data: data });
        } catch ({ response }) {
            return handleResponse({ success: false, ...response?.data });
        }
    }

    async getPostComments(postId) {
        try {
            const data = await apiService
                .api()
                .get(`${apiEndPoints.posts}/${postId}/comments`)
                .then(({ data }) => data);

            return handleResponse({ success: true, data: data });
        } catch ({ response }) {
            return handleResponse({ success: false, ...response?.data });
        }
    }
}

export const postService = new PostService();
