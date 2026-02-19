import { useDroppable } from "@dnd-kit/react";

type DropTaskProps = {
  status: string;
};

export const DropTask = ({ status }: DropTaskProps) => {
  const { ref } = useDroppable({ id: status });

  return (
    <div
      ref={ref}
      className="
        flex items-center justify-center
        h-10 w-full rounded-lg
        border-2 border-dashed border-gray-200
        text-xs text-gray-400
        transition-colors duration-200
      "
    >
      Soltar aquí
    </div>
  );
};