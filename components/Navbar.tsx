import Link from 'next/link';
import Image from 'next/image';

const Title = () => (
  <h1 className="font-light uppercase text-stone-700">Lyrichords</h1>
);

export const Navbar = () => (
  <nav className="fixed z-[100] -mx-4 flex h-[60px] w-full flex-row items-center bg-white bg-opacity-50 px-2 backdrop-blur-md">
    <Link href="/">
      <div className="flex cursor-pointer flex-row items-center gap-2">
        <Image src="/logo.svg" alt="lyrichords-logo" width={48} height={60} />
        <Title />
      </div>
    </Link>
  </nav>
);
