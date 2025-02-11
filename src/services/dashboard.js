import axios from "axios";

class DashboardService {
	static getData = async () => {
		try {
			return await axios.get("/dashboard").then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};
}

export default DashboardService;
