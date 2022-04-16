import { IDateProvider } from "../IDateProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

class DayJsProvider implements IDateProvider {
    dateNow() {
        return dayjs().toDate();
    }

    convertToUTC(date: Date): string {
          return dayjs(date).utc().local().format()
    }

    compareInHours(end_date: Date, start_date?: Date, ): number {
        const start_date_utc = this.convertToUTC(start_date)
        const end_date_utc = this.convertToUTC(end_date || this.dateNow())

        return dayjs(end_date_utc).diff(start_date_utc, "hours");
    }

}

export { DayJsProvider }