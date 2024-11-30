import axios from "axios";

class KelasService {
	static getKelas = async () => {
		try {
			return await axios.get("/kelas").then((res) => res.data);
		} catch (error) {
			return error.response.data.message;
		}
	};
}

export default KelasService;
