import * as React from 'react';

type CardProps = {
  href?: string;
};

function CardLink({ href, children }: React.PropsWithChildren<CardProps>) {
  return (
    <a
      href={href}
      className="m-4 max-w-[300px] rounded-lg border-2 border-stone-500 p-6 text-left text-inherit hover:border-red-400 hover:text-red-500"
    >
      {children}
    </a>
  );
}

export default CardLink;
