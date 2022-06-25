import * as React from 'react';

type CardProps = {
  href?: string;
};

export const CardLink = ({
  href,
  children,
}: React.PropsWithChildren<CardProps>) => (
  <a
    href={href}
    className="m-4 max-w-[300px] rounded-lg border-2 border-stone-500 p-6 text-left text-inherit hover:border-teal-500 hover:text-teal-600"
  >
    {children}
  </a>
);
