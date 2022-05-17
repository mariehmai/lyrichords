import * as React from 'react';

export const Grid = ({ children }: React.PropsWithChildren<{}>) => (
  <div className="flex w-full max-w-[800px] flex-col flex-wrap items-center justify-center md:w-auto md:flex-row">
    {children}
  </div>
);
