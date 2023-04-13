import * as moment from "moment";
import { currentUser } from "src/app/shared/utils/current-user";

export const dateFormatter = (params: any) => {
    const date = moment(params.value).format('MM/DD/YYYY')
    return params.value ? (date === 'Invalid date' ? '-' : date) : "-";
}
export const dateTimeFormatter = (params: any) => {
    const date = moment(params.value).format('MM/DD/YYYY HH:mm')
    return params.value ? (date === 'Invalid date' ? '-' : date) : "-";

}
export const dateTimeFullFormatter = (params: any) => {
    let timeZoneOffset: string = currentUser().offset;
    // timeZoneOffset = timeZoneOffset.replace("GMT", "").replace(":", "");
    timeZoneOffset = timeZoneOffset.replace("GMT", "");
    let timeSplit: any[] = timeZoneOffset.split(":")
    timeSplit[0] = parseInt(timeSplit[0]) * 60;
    const offsetByMinute = parseInt(timeSplit[0]) + parseInt(timeSplit[1]);
    const date = moment(params.value).utcOffset(offsetByMinute).format('MM/DD/YYYY HH:mm:ss');
    return params.value ? (date === 'Invalid date' ? '-' : date) : "--:--";
}