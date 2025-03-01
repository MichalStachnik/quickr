import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import getUserBalance from '../actions/getUserBalance';
import AnimatedNumberBasic from './AnimatedNumberBasic';
import { Tilt } from '@/components/motion/tilt-card';

const Balance = async () => {
  const { balance } = await getUserBalance();

  return (
    <Tilt rotationFactor={8} isRevese>
      <Card>
        <CardHeader>
          <CardTitle>Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            <AnimatedNumberBasic value={balance ?? 0} />
          </p>
        </CardContent>
      </Card>
    </Tilt>
  );
};

export default Balance;
