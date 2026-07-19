import axios from "axios";

class SettingsService {
	static getSeasons = async () => {
		try {
			return await axios.get("/settings/season").then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};

	static getLatestSeason = async () => {
		try {
			return await axios.get("/settings/season/latest").then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};

	static createSeason = async (data) => {
		try {
			return await axios.post("/settings/season", data).then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};

	static deleteSeason = async (id) => {
		try {
			return await axios.delete("/settings/season/" + id).then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};
}

export default SettingsService;
