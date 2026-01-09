type TCardWithHeaderProps = {
  title: string;
  children: React.ReactNode;
};

export default function CardWithHeader({
  title,
  children,
}: TCardWithHeaderProps) {
  return (
    <div className="bg-white">
      <div className="px-5 py-4 border-b border-gray-200">
        <h2 className="font-bold text-lg">{title}</h2>
      </div>
      {children}
    </div>
  );
}
