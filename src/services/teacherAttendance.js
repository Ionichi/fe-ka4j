import DateHelper from "@/utils/dateHelper";
import axios from "axios";

class TeacherAttendanceService {
	static getAttendance = async (date) => {
		const formatDate = DateHelper.formatISODate(date || new Date());
		try {
			return await axios.get("/absensi-mentor?tgl=" + formatDate).then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};

	static storeOrUpdateAttendance = async (date, data) => {
		const formatDate = DateHelper.formatISODate(date || new Date());
		try {
			return await axios.post("/absensi-mentor", { tgl: formatDate, data }).then((res) => res.data);
		} catch (error) {
			throw error.response.data.message;
		}
	};
}

export default TeacherAttendanceService;
