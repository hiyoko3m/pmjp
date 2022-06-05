import assert from "assert";

/**
 * The first date when the prime minister exist in Japan
 * is December 22nd, 1885 (The 18th year of Meiji).
 */
export function firstYearPmJpExists(): number {
  return 1885;
}

/**
 * Assumption: year >= firstYearPmJpExists()
 */
export function firstMonthPmJpExists(year: number): number {
  const firstYear = firstYearPmJpExists();
  assert(year >= firstYear);

  if (year == firstYear) {
    return 12;
  } else {
    return 1;
  }
}

/**
 * Assumption: (year, month) >= (firstYearPmJpExists(), firstYearPmJpExists(year))
 */
export function firstDatePmJpExists(year: number, month: number): number {
  const firstYear = firstYearPmJpExists();
  assert(year >= firstYear);

  const firstMonth = firstMonthPmJpExists(year);
  assert(month >= firstMonth);

  if (year == firstYear && month == firstMonth) {
    return 22;
  } else {
    return 1;
  }
}

export function lastDate(year: number, month: number): number {
  return 30;
}
