import { SignInButton } from '@clerk/nextjs';

const Guest = () => {
  return (
    <div className="guest">
      <p>please sign in</p>
      <SignInButton />
    </div>
  );
};

export default Guest;
