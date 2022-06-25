import { type SVGProps } from 'react';

type IconButtonProps = {
  title?: string;
  onClick: () => void;
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
};

export const IconButton = ({ title, onClick, Icon }: IconButtonProps) => (
  <button title={title} onClick={onClick}>
    <Icon className="h-5 w-5 cursor-pointer text-stone-600 hover:opacity-70" />
  </button>
);
