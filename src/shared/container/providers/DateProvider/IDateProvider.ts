interface IDateProvider {
    convertToUTC(data: Date): string;
    compareInHours(end_date: Date, start_date?: Date): number;
    dateNow(): Date;
}

export { IDateProvider }