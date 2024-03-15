import { renderHook, act } from '@testing-library/react';
import { useToggle } from './useToggle';

test('Should toggle the value without using a default value.', () => {
  const { result } = renderHook(useToggle);

  const [, { toggle, toggleOn, toggleOff }] = result.current;
  expect(result.current[0]).toBe(false);
  act(() => toggleOn());
  expect(result.current[0]).toBe(true);
  act(() => toggleOff());
  expect(result.current[0]).toBe(false);
  act(() => toggle(true));
  expect(result.current[0]).toBe(true);
});

test('Should toggle the value with using a default value.', () => {
  const { result } = renderHook(useToggle, { initialProps: true });

  const [, { toggle, toggleOn, toggleOff }] = result.current;
  expect(result.current[0]).toBe(true);
  act(() => toggleOff());
  expect(result.current[0]).toBe(false);
  act(() => toggleOn());
  expect(result.current[0]).toBe(true);
  act(() => toggle(false));
  expect(result.current[0]).toBe(false);
});
