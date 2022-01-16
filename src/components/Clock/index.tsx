/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';

/**
 * A Clock component that refreshes every minute
 *
 * @returns {JSX.Element} - The current time
 */
const Clock = () => {
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString('en-US'));
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString('en-US')), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div data-test="clock-component">
      Time:
      <span data-test="time-display">
        {time}
      </span>
    </div>
  );
};

export default Clock;
