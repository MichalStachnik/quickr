import { Button } from '@/components/ui/button';
import { SignInButton } from '@clerk/nextjs';

const Guest = () => {
  return (
    <div className="guest">
      <p className="mb-4">Please Sign In</p>
      <SignInButton>
        <Button>Sign In</Button>
      </SignInButton>
    </div>
  );
};

export default Guest;
