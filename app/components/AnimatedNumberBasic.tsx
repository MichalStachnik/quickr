'use client';
import AnimatedNumber from '@/components/motion/animated-number';
import { useEffect, useState } from 'react';

export default function AnimatedNumberBasic({ value }: { value: number }) {
  const [localValue, setLocalValue] = useState(0);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <span className="flex w-full items-center justify-center">
      <AnimatedNumber
        className="inline-flex items-center font-mono text-2xl font-light text-zinc-800 dark:text-zinc-50"
        springOptions={{
          bounce: 0,
          duration: 2000,
        }}
        value={localValue}
      />
    </span>
  );
}
