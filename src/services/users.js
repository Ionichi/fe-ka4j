import axios from "axios";

class UserService {
	static getUsers = async () => {
		try {
			return await axios.get("/auth/users").then((res) => res.data);
		} catch (error) {
			return error.response.data.message;
		}
	};
}

export default UserService;
