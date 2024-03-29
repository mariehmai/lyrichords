import cn from 'classnames';
import type { Size } from './types';

type IconButtonProps = {
  size?: Size;
  title?: string;
  label?: string;
  withBorder?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

function IconButton({
  size = 'sm',
  title = '',
  label = '',
  onClick = () => {},
  withBorder = false,
  disabled = false,
  Icon,
}: IconButtonProps) {
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button
      className={cn(
        'group flex w-fit items-center gap-1 outline-red-400 active:shadow-inner disabled:opacity-70',
        {
          'rounded-md border-2 border-stone-500 px-1.5 py-0.5 hover:shadow-sm':
            withBorder,
        }
      )}
      title={title}
      disabled={disabled}
      onClick={onButtonClick}
    >
      <Icon
        className={cn('cursor-pointer border-0 border-none text-stone-600', {
          'h-5 w-5': size === 'sm',
          'h-7 w-7': size === 'md',
          'cursor-default': disabled,
        })}
      />
      {!!label && (
        <span
          className={cn('text-sm text-stone-600 group-hover:underline', {
            'group-hover:no-underline': disabled,
          })}
        >
          {label}
        </span>
      )}
    </button>
  );
}

export default IconButton;
