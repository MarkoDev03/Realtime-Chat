export class DateFormats {
  public static currentDateLogFormat(): string {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = DateFormats.formatValue(date.getDate());

    const hour = DateFormats.formatValue(date.getHours());
    const minutes = DateFormats.formatValue(date.getMinutes());
    const seconds = DateFormats.formatValue(date.getSeconds());

    const milliseconds = date.getMilliseconds();

    const dateFormat = `${year}-${month}-${day}`;
    const timeFormat = `${hour}:${minutes}:${seconds}:${milliseconds}`;

    return `${dateFormat} ${timeFormat}`;
  }

  public static formatCurrentDate() {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = DateFormats.formatValue(date.getDate());

    return `${day}.${month}.${year}`;
  }

  private static formatValue(value: number) {
    const lessThanTen = `0${value}`;
    return value < 10 ? lessThanTen : value;
  }
}