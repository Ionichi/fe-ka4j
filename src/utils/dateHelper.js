import moment from "moment";

class DateHelper {
	static formatLocalDate = (date) => {
		return date ? moment(date).format("DD MMM yyyy") : null;
	};
}

export default DateHelper;
