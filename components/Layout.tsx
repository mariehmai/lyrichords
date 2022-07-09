import * as React from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

type LayoutProps = {
  withFooter?: boolean;
};

export const Layout = ({
  withFooter = true,
  children,
}: React.PropsWithChildren<LayoutProps>) => (
  <div className="flex h-full flex-col justify-between px-4 md:px-8">
    <div className="flex grow flex-col">
      <Navbar />
      <div className="h-full pt-[60px]">{children}</div>
    </div>
    {withFooter && <Footer />}
  </div>
);
