class DateOnly {

  constructor(public year: number, public month: number, public day: number) {
    const tmp = new Date(year, month - 1, day);
    if (Number.isNaN(tmp.getTime())) {
      throw new TypeError(`Invalid date: ${year}-${month}-${day}`);
    }
  }

  toString(): string {
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${this.year}-${pad(this.month)}-${pad(this.day)}`;
  }

  print(lang: string = "de-DE"): string {
    const formatter = new Intl.DateTimeFormat(lang, {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    return formatter.format(this.toDate());
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

    return new DateOnly(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    );
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

  public toDate(): Date {
    return new Date(this.year, this.month - 1, this.day);
  }
}

export default DateOnly;
