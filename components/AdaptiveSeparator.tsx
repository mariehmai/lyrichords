import cn from 'classnames';

function AdaptiveSeparator() {
  return (
    <div
      className={cn(
        'my-1 h-[1px] w-full border-b border-stone-300', // Horizontal separator
        'md:my-0 md:mx-1 md:h-[45px] md:w-[1px] md:border-r' // Vertical separator
      )}
    ></div>
  );
}

export default AdaptiveSeparator;
