import Footer from './Footer';
import Navbar from './Navbar';

type LayoutProps = {
  withFooter?: boolean;
};

function Layout({
  withFooter = true,
  children,
}: React.PropsWithChildren<LayoutProps>) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex grow flex-col">
        <Navbar />
        <div className="h-full px-4 pt-[60px] md:px-8">{children}</div>
      </div>
      {withFooter && <Footer />}
    </div>
  );
}

export default Layout;
