export default function Logo() {
  return (
    <div className="flex  align-middle">
      <div className={`text-slate-500`}>COLORIZE</div>
      <div className="flex px-4">
        <div className={`w-3 h-8 bg-blue-200`}></div>
        <div className={`w-3 h-8 bg-blue-300`}></div>
        <div className={`w-3 h-8 bg-blue-400`}></div>
      </div>
    </div>
  );
}
