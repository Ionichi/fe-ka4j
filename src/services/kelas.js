import axios from "axios";

class KelasService {
	static getKelas = async () => {
		try {
			return await axios.get("/kelas").then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};

	static getKelasById = async (id) => {
		try {
			return await axios.get("/kelas/" + id).then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};

	static storeOrUpdateKelas = async (data) => {
		try {
			if (data.id) {
				return await axios.put("/kelas/" + data.id, data).then((res) => res.data);
			}
			return await axios.post("/kelas", data).then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};

	static deleteKelas = async (id) => {
		try {
			return await axios.delete("/kelas/" + id).then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};
}

export default KelasService;
