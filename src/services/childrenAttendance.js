import DateHelper from "@/utils/dateHelper";
import axios from "axios";

class ChildrenAttendanceService {
	static getAttendance = async (date, kelasId) => {
		const formatDate = DateHelper.formatISODate(date || new Date());
		try {
			if (!kelasId) {
				throw "Please choose a class and date first.";
			}

			return await axios.get(`/absensi-children?tgl=${formatDate}&kelasId=${kelasId}`).then((res) => res.data);
		} catch (error) {
			if (!error.message) {
				throw error;
			} else {
				throw error.response.data.message;
			}
		}
	};

	static storeOrUpdateAttendance = async (date, data) => {
		const formatDate = DateHelper.formatISODate(date || new Date());
		try {
			return await axios.post("/absensi-children", { tgl: formatDate, data }).then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};
}

export default ChildrenAttendanceService;
