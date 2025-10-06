import { typeNodes } from "@/constants/constants";
import { useDnD } from "@/context/DnDContext";

export default () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="h-full overflow-auto">
      {Object.keys(typeNodes).map((key) => (
        <div
          key={key}
          className="dndnode"
          onDragStart={(event) => onDragStart(event, key)}
          draggable
        >
          {typeNodes[key].label}
        </div>
      ))}
    </aside>
  );
};
