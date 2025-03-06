'use client';
import AnimatedNumber from '@/components/motion/animated-number';
import { useEffect, useState } from 'react';

export default function AnimatedNumberBasic({
  value,
  numberColor,
}: {
  value: number;
  numberColor: string;
}) {
  const [localValue, setLocalValue] = useState(0);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <span className="flex w-full items-center justify-center">
      <AnimatedNumber
        className={`inline-flex items-center font-mono text-2xl font-light ${numberColor}`}
        springOptions={{
          bounce: 0,
          duration: 2000,
        }}
        value={localValue}
      />
    </span>
  );
}
