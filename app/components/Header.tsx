import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import ScrollingText from './ScrollingText';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Header = async () => {
  return (
    <header className="border-b bg-background mb-4 flex items-center">
      <SidebarTrigger />
      <div className="mx-auto px-4 h-16 flex items-center justify-between w-full">
        <Link href="/" className="text-xl font-bold hover:opacity-80">
          Quicker Books
        </Link>
        <div className="w-[140px]">
          <ScrollingText />
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
