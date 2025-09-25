import { useReactFlow } from "@xyflow/react";

function Header() {
  const { getNodes, getEdges } = useReactFlow();
  const handleSave = (e) => {
    e.stopPropagation();

    const nodes = getNodes();
    const edges = getEdges();

    localStorage.setItem("reactFlowNodes", JSON.stringify(nodes));
    localStorage.setItem("reactFlowEdges", JSON.stringify(edges));
  };

  return (
    <div className="w-full h-16 flex items-center justify-end border-b px-5">
      <p
        onClick={handleSave}
        className=" text-[14px] cursor-pointer hover:text-blue-500"
      >
        Lưu lại
      </p>
    </div>
  );
}

export default Header;
