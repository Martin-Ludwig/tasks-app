class DateOnly {
    constructor(
        public year: number,
        public month: number,
        public day: number
    ) {}

    toString(): string {
        const pad = (n: number) => n.toString().padStart(2, "0");
        return `${this.year}-${pad(this.month)}-${pad(this.day)}`;
    }

    static from(date: string): DateOnly {
        const [year, month, day] = date.split("-").map(Number);
        return new DateOnly(year, month, day);
    }
}

export default DateOnly;