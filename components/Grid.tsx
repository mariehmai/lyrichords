import * as React from 'react';

function Grid({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex w-full max-w-[800px] flex-col flex-wrap items-center justify-center md:w-auto md:flex-row">
      {children}
    </div>
  );
}

export default Grid;
