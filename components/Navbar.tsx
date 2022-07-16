import Link from 'next/link';
import Logo from './Logo';

function Title() {
  return <h1 className="font-light uppercase text-stone-700">Lyrichords</h1>;
}

function Navbar() {
  return (
    <nav className="fixed z-[100] -mx-4 flex h-[60px] w-full flex-row items-center bg-white bg-opacity-50 px-2 backdrop-blur-md">
      <Link href="/">
        <div className="flex cursor-pointer flex-row items-center gap-2">
          <Logo />
          <Title />
        </div>
      </Link>
    </nav>
  );
}

export default Navbar;
