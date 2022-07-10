export interface AdDate {
  adYear: number;
  adMonth: number;
  adDay: number;
}

export interface JpDate {
  jpEra: string;
  jpYear: number;
  jpMonth: number;
  jpDay: number;
}

export interface AdPartialDate {
  adYear?: number;
  adMonth?: number;
  adDay?: number;
}

export interface JpPartialDate {
  jpEra?: string;
  jpYear?: number;
  jpMonth?: number;
  jpDay?: number;
}

function compareAdDates(x: AdDate, y: AdDate): number {
  if (x.adYear < y.adYear) {
    return -1;
  } else if (x.adYear == y.adYear && x.adMonth < y.adMonth) {
    return -1;
  } else if (
    x.adYear == y.adYear &&
    x.adMonth == y.adMonth &&
    x.adDay < y.adDay
  ) {
    return -1;
  } else if (
    x.adYear == y.adYear &&
    x.adMonth == y.adMonth &&
    x.adDay == y.adDay
  ) {
    return 0;
  } else {
    return 1;
  }
}

const jpEras: { era: string; adDate: AdDate }[] = [
  { era: "不明", adDate: { adYear: 1, adMonth: 1, adDay: 1 } },
  { era: "明治", adDate: { adYear: 1868, adMonth: 1, adDay: 1 } },
  { era: "大正", adDate: { adYear: 1912, adMonth: 7, adDay: 30 } },
  { era: "昭和", adDate: { adYear: 1926, adMonth: 12, adDay: 25 } },
  { era: "平成", adDate: { adYear: 1989, adMonth: 1, adDay: 8 } },
  { era: "令和", adDate: { adYear: 2019, adMonth: 5, adDay: 1 } },
];

export function AdToJpDate(adDate: AdPartialDate): JpPartialDate {
  if (
    adDate.adYear == undefined ||
    adDate.adMonth == undefined ||
    adDate.adDay == undefined
  ) {
    return { jpMonth: adDate.adMonth, jpDay: adDate.adDay };
  }
  const adDateNonPartial = {
    adYear: adDate.adYear,
    adMonth: adDate.adMonth,
    adDay: adDate.adDay,
  };

  let era: string = jpEras[0].era;
  let adDateBegin: AdDate = jpEras[0].adDate;
  for (const eraBegin of jpEras) {
    if (compareAdDates(eraBegin.adDate, adDateNonPartial) == 1) {
      break;
    }
    era = eraBegin.era;
    adDateBegin = eraBegin.adDate;
  }
  const jpYear = adDateNonPartial.adYear - adDateBegin.adYear + 1;
  return {
    jpEra: era,
    jpYear,
    jpMonth: adDateNonPartial.adMonth,
    jpDay: adDateNonPartial.adDay,
  };
}

/**
 * The first date when the prime minister exist in Japan
 * is December 22nd, 1885 (The 18th year of Meiji).
 */
export function firstYearPmJpExists(): number {
  return 1885;
}

/**
 * Today's year
 */
export function lastYear(): number {
  return new Date().getFullYear();
}

/**
 * Assumption: year >= firstYearPmJpExists()
 */
export function firstMonthPmJpExists(year?: number): number {
  const firstYear = firstYearPmJpExists();

  if (year == undefined || year != firstYear) {
    return 1;
  } else {
    return 12;
  }
}

export function lastMonth(year?: number): number {
  const lastY = lastYear();

  if (year == undefined || year != lastY) {
    return 12;
  } else {
    return new Date().getMonth();
  }
}

/**
 * Assumption: (year, month) >= (firstYearPmJpExists(), firstYearPmJpExists(year))
 */
export function firstDayPmJpExists(year?: number, month?: number): number {
  const firstYear = firstYearPmJpExists();
  const firstMonth = firstMonthPmJpExists(year);

  if (
    year == undefined ||
    month == undefined ||
    !(year == firstYear && month == firstMonth)
  ) {
    return 1;
  } else {
    return 22;
  }
}

export function lastDay(year?: number, month?: number): number {
  const lastY = lastYear();
  const lastM = lastMonth(year);

  if (year == undefined || month == undefined) {
    return 31;
  } else if (year == lastY && month == lastM) {
    return new Date().getDate();
  } else {
    if (month == 4 || month == 6 || month == 9 || month == 11) {
      return 30;
    } else if (month == 2) {
      if (year % 100 == 0 && year % 400 != 0) {
        return 28;
      } else if (year % 4 == 0) {
        return 29;
      } else {
        return 28;
      }
    } else {
      return 31;
    }
  }
}
