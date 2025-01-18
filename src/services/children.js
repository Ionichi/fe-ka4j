import axios from "axios";

class ChildrenService {
	static getChildren = async () => {
		try {
			return await axios.get("/children").then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};

	static getChildrenById = async (id) => {
		try {
			return await axios.get("/children/" + id).then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};

	static storeOrUpdateChildren = async (data) => {
		try {
			if (data.id) {
				return await axios.put("/children/" + data.id, data).then((res) => res.data);
			}
			return await axios.post("/children", data).then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};

	static deleteChildren = async (id) => {
		try {
			return await axios.delete("/children/" + id).then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};
}

export default ChildrenService;
