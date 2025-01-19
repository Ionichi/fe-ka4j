import axios from "axios";

class UserService {
	static getUsers = async () => {
		try {
			return await axios.get("/auth/users").then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};

	static getUserById = async (id) => {
		try {
			return await axios.get("/auth/users/" + id).then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};

	static storeOrUpdateUser = async (data) => {
		try {
			const formatData = {
				...data,
				kelasId: data.kelas,
			};
			delete formatData.kelas;

			if (data.id) {
				return await axios.put("/auth/users/" + data.id, formatData).then((res) => res.data);
			}
			return await axios.post("/auth/users", formatData).then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};

	static deleteUser = async (id) => {
		try {
			return await axios.delete("/auth/users/" + id).then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};
}

export default UserService;
