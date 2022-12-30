interface Props {
  name?: string;
  value?: string | React.ReactNode;
}

export default function CardField({ name, value }: Props) {
  return (
    <div className="p-1 flex items-center font-medium">
      {name && <div className="px-1 text-slate-600 select-none">{name}</div>}
      <div className="px-1 flex-1 text-slate-400">{value}</div>
    </div>
  );
}
