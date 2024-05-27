import axiosInstance from "@/services/axios-instance";

export const userServices = {
    async addUser(new_user){
        try {
            const response = await axiosInstance.post("user/users/",new_user)
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}