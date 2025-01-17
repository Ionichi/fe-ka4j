import axios from "axios";

class UserService {
	static getUsers = async () => {
		try {
			return await axios.get("/auth/users").then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};

	// static getUserByUsername = async (id) => {
	// 	try {
	// 		return await axios.get("/kelas/" + id).then((res) => res.data);
	// 	} catch (error) {
	// 		throw error.response.data.message;
	// 	}
	// };

	static storeOrUpdateUser = async (data) => {
		try {
			const formatData = {
				...data,
				kelasId: data.kelas,
			};
			delete formatData.kelas;

			if (data.id) {
				return await axios.post("/register/" + data.id, formatData).then((res) => res.data);
			}
			return await axios.post("/auth/register", formatData).then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};
}

export default UserService;
