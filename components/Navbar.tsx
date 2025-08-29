import Link from 'next/link';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

function Title() {
  return (
    <h1 className="font-light uppercase text-stone-700 dark:text-stone-300">
      Lyrichords
    </h1>
  );
}

function Navbar() {
  return (
    <nav className="fixed z-[100] flex h-16 w-full flex-row items-center justify-between bg-white/50 dark:bg-stone-900/50 px-4 backdrop-blur-md md:px-8 border-b border-stone-200/20 dark:border-stone-700/20">
      <Link href="/">
        <div className="flex cursor-pointer flex-row items-center gap-2">
          <div className="-ml-2">
            <Logo />
          </div>
          <Title />
        </div>
      </Link>

      <ThemeToggle />
    </nav>
  );
}

export default Navbar;
