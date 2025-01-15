import React, { useState, useEffect } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

export default function Clock({ times = new Date().getTime() }) {
  const [time, setTime] = useState('0');

  useEffect(() => {
    const interval = setInterval(() => {
      const oldTime = times;
      const nowTime = new Date().getTime();

      const newTime = formatDistanceToNowStrict(oldTime, nowTime);
      setTime(newTime);
    }, 1000);

    return () => clearInterval(interval);
  });

  const timeString = `created ${time} ago`;

  return <>{timeString}</>;
}
