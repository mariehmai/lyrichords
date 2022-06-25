import * as React from 'react';
import { Footer } from './Footer';

type LayoutProps = {
  withFooter?: boolean;
};

export const Layout = ({
  withFooter = true,
  children,
}: React.PropsWithChildren<LayoutProps>) => (
  <div className="px-8">
    {children}
    {withFooter && <Footer />}
  </div>
);

export const MainContainer = ({ children }: React.PropsWithChildren<{}>) => (
  <div className="flex min-h-[100vh] flex-1 flex-col items-center justify-center py-16">
    {children}
  </div>
);
