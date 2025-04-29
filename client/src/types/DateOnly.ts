class DateOnly {
    constructor(
        public year: number,
        public month: number,
        public day: number
    ) {
        const tmp = new Date(year, month, day);
        if (Number.isNaN(tmp.getTime())) {
            throw new TypeError(`Invalid date: ${year}-${month}-${day}`);
        }
    }

    toString(): string {
        const pad = (n: number) => n.toString().padStart(2, "0");
        return `${this.year}-${pad(this.month)}-${pad(this.day)}`;
    }

    static from(date: string): DateOnly {
        const [year, month, day] = date.split("-").map(Number);
        return new DateOnly(year, month, day);
    }

    static today(relative?: number): DateOnly {
        const today = new Date();
        if (typeof relative === "number" && relative !== 0) {
            today.setDate(today.getDate() + relative);
        }

        return new DateOnly(today.getFullYear(), today.getMonth(), today.getDate());
    }

    public equal(other: DateOnly): boolean {
        return (
            this.year === other.year &&
            this.month === other.month &&
            this.day === other.day
        );
    }

    public compareTo(other: DateOnly): number {
        if (this.year !== other.year) {
            return this.year < other.year ? -1 : 1;
        }
        if (this.month !== other.month) {
            return this.month < other.month ? -1 : 1;
        }
        if (this.day !== other.day) {
            return this.day < other.day ? -1 : 1;
        }
        return 0;
    }

    public isBefore(other: DateOnly): boolean {
        return this.compareTo(other) < 0;
    }
    
    public isAfter(other: DateOnly): boolean {
        return this.compareTo(other) > 0;
    }

}

export default DateOnly;