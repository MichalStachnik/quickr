import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './components/ThemeProvider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Header from './components/Header';
import AppSidebar from './components/AppSidebar';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quickr',
  description: 'a minimalist expense tracker app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={roboto.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <main className="bg-background text-foreground min-h-screen mx-auto px-4 w-full">
                  <Header />
                  <div className="max-w-3xl mx-auto space-y-8 my-4">
                    {children}
                  </div>
                </main>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
