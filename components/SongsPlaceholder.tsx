import { Divider } from './Divider';

export const SongsPlaceholder = () => (
  <div className="flex animate-pulse space-x-4">
    <div className="flex-1 space-y-2 py-1">
      <div className="grid grid-cols-4 items-center gap-2 py-2.5">
        <div className="col-span-1 h-2 w-2/3 rounded bg-stone-200"></div>
        <div className="col-span-2 h-2 w-2/3 rounded bg-stone-200"></div>
        <div className="col-span-1 h-5 w-1/3 rounded-full bg-stone-200"></div>
      </div>
      <Divider />
      <div className="grid grid-cols-4 items-center gap-2 py-2.5">
        <div className="col-span-1 h-2 w-4/5 rounded bg-stone-200"></div>
        <div className="col-span-2 h-2 w-2/3 rounded bg-stone-300"></div>
        <div className="col-span-1 h-5 w-1/4 rounded-full bg-stone-200"></div>
      </div>
      <Divider />
      <div className="grid grid-cols-4 items-center gap-2 py-2.5">
        <div className="col-span-1 h-2 w-1/2 rounded bg-stone-300"></div>
        <div className="col-span-2 h-2 w-4/5 rounded bg-stone-200"></div>
        <div className="col-span-1 h-5 w-1/2 rounded-full bg-stone-200"></div>
      </div>
      <Divider />
      <div className="grid grid-cols-4 items-center gap-2 py-2.5">
        <div className="col-span-1 h-2 w-1/2 rounded bg-stone-300"></div>
        <div className="col-span-2 h-2 w-4/5 rounded bg-stone-200"></div>
        <div className="col-span-1 h-5 w-1/2 rounded-full bg-stone-200"></div>
      </div>
      <Divider />
      <div className="grid grid-cols-4 items-center gap-2 py-2.5">
        <div className="col-span-1 h-2 w-4/5 rounded bg-stone-200"></div>
        <div className="col-span-2 h-2 w-2/3 rounded bg-stone-300"></div>
        <div className="col-span-1 h-5 w-1/4 rounded-full bg-stone-200"></div>
      </div>
    </div>
  </div>
);
