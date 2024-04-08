export const getFormattedDateTimeFromTimeStamp = (timestamp) => {
    const dateObj = new Date(timestamp);

    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1; // Month is 0-indexed, so we add 1
    const year = dateObj.getUTCFullYear();

    const hours = "11";
    const minutes = "00";

    const formattedDate = `${getDayWithOrdinal(day)} ${getMonthName(month)}, ${year} at ${hours}:${minutes}`;

    function getMonthName(month) {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        return months[month - 1];
    }

    function getDayWithOrdinal(day) {
        if (day === 1 || day === 21 || day === 31) {
            return `${day}st`;
        } else if (day === 2 || day === 22) {
            return `${day}nd`;
        } else if (day === 3 || day === 23) {
            return `${day}rd`;
        } else {
            return `${day}th`;
        }
    }

    return formattedDate // Output: 2nd Jan, 2024 at 11:00

}