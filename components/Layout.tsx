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
    <div className="flex h-full flex-col justify-between px-4 md:px-8">
      <div className="flex grow flex-col">
        <Navbar />
        <div className="h-full pt-[60px]">{children}</div>
      </div>
      {withFooter && <Footer />}
    </div>
  );
}

export default Layout;
