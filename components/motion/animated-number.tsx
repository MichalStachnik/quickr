'use client';

import { useEffect } from 'react';
import { motion, SpringOptions, useSpring, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
  as?: React.ElementType;
};

const AnimatedNumber = ({
  value,
  className,
  springOptions,
  as = 'span',
}: AnimatedNumberProps) => {
  const MotionComponent = motion(as);

  const spring = useSpring(value, springOptions);

  const display = useTransform(spring, (current) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(current)
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <MotionComponent className={cn('tabular-nums', className)}>
      {display}
    </MotionComponent>
  );
};

export default AnimatedNumber;
