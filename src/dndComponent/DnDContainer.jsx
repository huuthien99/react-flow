import {
  addEdge,
  Background,
  Controls,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useRef } from "react";

import DialogCommon from "@/common/DialogCommon";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { typeNodes } from "@/constants/constants";
import { useDialog } from "@/context/DialogContext";
import { useDnD } from "@/context/DnDContext";
import CustomEdge from "./CustomEdges";

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
};

const initialNodes = [
  {
    id: getId(),
    type: "input",
    data: { label: "Start" },
    position: { x: 200, y: 100 },
    ...nodeDefaults,
  },
];

const edgeTypes = {
  custom: CustomEdge,
};

function DnDContainer() {
  const [type] = useDnD();
  const [_, setOpen, __, setSelectedNode] = useDialog();

  const reactFlowWrapper = useRef(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "custom",
            animated: true,
          },
          eds
        )
      ),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: typeNodes[type].label },
        ...nodeDefaults,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  const onNodeClick = (node) => {
    if (node.type === "input") return;
    setSelectedNode(node);
    setOpen(true);
  };

  return (
    <div className="dndflow">
      <SideBar />
      <div style={{ height: "100vh", width: "100%" }}>
        <Header />
        <DialogCommon />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onDrop={onDrop}
            onConnect={onConnect}
            edgeTypes={edgeTypes}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
          >
            <Background />
            <Controls position="bottom-right" />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default DnDContainer;
