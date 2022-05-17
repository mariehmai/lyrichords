import Image from 'next/image';

export const Footer = () => (
  <footer className="flex flex-1 justify-center items-center py-8 border-t border-t-stone-200">
    <a
      className="flex justify-center items-center grow"
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by{' '}
      <span className="h-[1em] ml-2">
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span>
    </a>
  </footer>
);
