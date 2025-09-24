import { typeNodes } from "./constants/constants";
import { useDnD } from "./context/DnDContext";

export default () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">
        You can drag these nodes to the pane on the right.
      </div>
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
