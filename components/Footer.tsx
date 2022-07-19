import Image from 'next/image';
import ukulele from '../public/ukulele.jpeg';

function Footer() {
  return (
    <footer className="flex h-16 min-h-[4rem] items-center justify-center overflow-hidden">
      <Image
        className="opacity-20"
        src={ukulele}
        alt="A ukulele with a bunch of people sat on the grass in the background."
        priority
      />
      <span className="absolute flex grow items-center justify-center px-4 md:px-8">
        © 2022 Marie-Hélène Mai
      </span>
    </footer>
  );
}

export default Footer;
