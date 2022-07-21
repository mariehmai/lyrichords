function Grid({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex w-full flex-col flex-wrap items-center justify-center gap-4 md:w-auto md:flex-row">
      {children}
    </div>
  );
}

export default Grid;
