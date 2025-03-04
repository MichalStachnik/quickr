/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import getUserBalance from '../actions/getUserBalance';
import AnimatedNumberBasic from './AnimatedNumberBasic';
import { Tilt } from '@/components/motion/tilt-card';
import { GlowEffect } from '@/components/motion/glow-effect';
import { motion } from 'motion/react';
import { useState } from 'react';

const Balance = ({ balance }: { balance: number | undefined }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <Tilt rotationFactor={8} isRevese>
      <div
        className="relative h-[200px] w-full"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
        >
          <GlowEffect
            colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']}
            mode="colorShift"
            blur="medium"
            duration={4}
          />
        </motion.div>
        <div className="relative flex h-full flex-col items-center justify-center rounded-md border border-zinc-300/40 bg-zinc-100 px-4 py-3 dark:border-zinc-700/40 dark:bg-zinc-900">
          <div>Balance: </div>
          <AnimatedNumberBasic value={balance ?? 0} />
        </div>
      </div>
    </Tilt>
  );
};

export default Balance;
