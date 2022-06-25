import Link from 'next/link';
import Image from 'next/image';

const Title = () => (
  <h1 className="font-light uppercase text-white">Lyrichords</h1>
);

export const Navbar = () => (
  <nav className="-mx-8 flex h-[60px] flex-row items-center bg-red-400 px-6">
    <Link href="/">
      <div className="flex cursor-pointer flex-row items-center gap-2">
        <Image src="/logo.svg" alt="lyrichords-logo" width={40} height={60} />
        <Title />
      </div>
    </Link>
  </nav>
);
