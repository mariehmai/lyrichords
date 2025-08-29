import * as React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  withFooter?: boolean;
}

function Layout({
  withFooter = true,
  children,
}: React.PropsWithChildren<LayoutProps>) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-200">
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1 px-4 pt-16 md:px-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
      {withFooter && <Footer />}
    </div>
  );
}

export default Layout;
