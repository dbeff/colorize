export interface Props {
  icon?: React.ReactNode;
  title?: string;
}

export default function NavItem({ icon, title }: Props) {
  return (
    <div className="mx-4 text-slate-400 font-medium text-sm cursor-pointer hover:text-indigo-500 transition-colors hover:bg-slate-100 rounded-md">
      <div className="flex items-center p-4">
        {icon && <div className="mr-2 h-5 w-5">{icon}</div>}
        <div className="pl-2">{title}</div>
      </div>
    </div>
  );
}
