import { SwatchIcon } from "@heroicons/react/24/outline";

export default function Logo() {
  return (
    <div className="flex items-center p-8 font-bold text-indigo-500 text-sm">
      <SwatchIcon className="h-5 w-5 mr-2" />
      <div>COLORIZE</div>
    </div>
  );
}
