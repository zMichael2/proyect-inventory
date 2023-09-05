"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateInUSTimezone = void 0;
const getDateInUSTimezone = () => {
    const currentTime = new Date();
    const options = {
        timeZone: "America/New_York",
    };
    const year = currentTime.toLocaleString("en-US", Object.assign(Object.assign({}, options), { year: "numeric" }));
    const month = currentTime.toLocaleString("en-US", Object.assign(Object.assign({}, options), { month: "2-digit" }));
    const day = currentTime.toLocaleString("en-US", Object.assign(Object.assign({}, options), { day: "2-digit" }));
    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
};
exports.getDateInUSTimezone = getDateInUSTimezone;
