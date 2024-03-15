import { timeFormatter } from './utils';

test('Should correctly format time when the number of minutes exceeds 60', () => {
  expect(timeFormatter(61)).toBe('1h 1min');
});

describe('Should correctly format time when the number of minutes is less than 60', () => {
  test('time is 59 minutes', () => {
    expect(timeFormatter(59)).toBe('59min');
  });

  test('time is 9 minutes', () => {
    expect(timeFormatter(9)).toBe('9min');
  });
});
