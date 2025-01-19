import moment from "moment";

class DateHelper {
	static formatLocalDate = (date) => {
		return date ? moment(date).format("DD MMMM yyyy") : null;
	};

	static formatISODate = (date) => {
		return date ? moment(date).format("YYYY-MM-DD") : null;
	};
}

export default DateHelper;
