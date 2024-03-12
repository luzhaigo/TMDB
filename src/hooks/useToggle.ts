import { useState, useCallback } from 'react';

export const useToggle = (initValue = false) => {
  const [value, toggle] = useState(initValue);

  const toggleOn = useCallback(() => toggle(true), []);
  const toggleOff = useCallback(() => toggle(false), []);

  return [value, { toggle, toggleOn, toggleOff }] as const;
};
