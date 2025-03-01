import { TextLoop } from '@/components/motion/text-loop';

const ScrollingText = () => {
  return (
    <div className="inline-flex whitespace-pre-wrap text-sm">
      Track your{' '}
      <TextLoop
        className="overflow-y-clip"
        transition={{
          type: 'spring',
          stiffness: 900,
          damping: 80,
          mass: 10,
        }}
        variants={{
          initial: {
            y: 20,
            rotateX: 90,
            opacity: 0,
            filter: 'blur(4px)',
          },
          animate: {
            y: 0,
            rotateX: 0,
            opacity: 1,
            filter: 'blur(0px)',
          },
          exit: {
            y: -20,
            rotateX: -90,
            opacity: 0,
            filter: 'blur(4px)',
          },
        }}
      >
        <span>Expenses</span>
        <span>Shopping</span>
        <span>Bills</span>
        <span>Income</span>
      </TextLoop>
    </div>
  );
};

export default ScrollingText;
