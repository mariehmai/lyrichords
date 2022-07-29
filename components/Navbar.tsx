import Link from 'next/link';
import Logo from './Logo';

function Title() {
  return <h1 className="font-light uppercase text-stone-700">Lyrichords</h1>;
}

function Navbar() {
  return (
    <nav className="fixed z-[100] flex h-16 w-full flex-row items-center bg-white bg-opacity-50 px-4 backdrop-blur-md md:px-8">
      <Link href="/">
        <a>
          <div className="flex cursor-pointer flex-row items-center gap-2">
            <div className="-ml-2">
              <Logo />
            </div>
            <Title />
          </div>
        </a>
      </Link>
    </nav>
  );
}

export default Navbar;
