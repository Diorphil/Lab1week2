interface ItemProps {
  name: string;
  quantity: number;
  category: string;
  onSelect: () => void;
}

export default function Item({ name, quantity, category, onSelect }: ItemProps) {
  return (
    <div
      onClick={onSelect}
     className="flex justify-between items-center 
           bg-slate-800 text-slate-100 
           p-4 rounded-lg shadow 
           cursor-pointer 
           hover:bg-white hover:text-black
           transition-colors duration-200"
    >
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-slate-400 capitalize">{category}</p>
      </div>
      <span className="text-lg font-bold">{quantity}</span>
    </div>
  );
}