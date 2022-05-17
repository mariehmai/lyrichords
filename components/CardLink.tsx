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
    className="m-4 max-w-[300px] rounded-lg border border-[#eaeaea] p-6 text-left text-inherit hover:border-[#0070f3] hover:text-[#0070f3]"
  >
    {children}
  </a>
);
