import {
  Background,
  Controls,
  Position,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

import { useCallback, useRef } from "react";

import "@xyflow/react/dist/style.css";

import SideBar from "./SideBar";

import { DnDProvider, useDnD } from "./context/DnDContext";
import CustomEdge from "./CustomEdges";
import { typeNodes } from "./constants/constants";
import Header from "./components/Header";

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

// const nodeTypes = {
//   custom: CustomNode,
// };

const DnDFlow = () => {
  const [type] = useDnD();

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

  const onNodeClick = (event, node) => {
    console.log("click", node);
  };

  return (
    <div className="dndflow">
      <SideBar />
      <div style={{ height: "100vh", width: "100%" }}>
        <Header />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            edgeTypes={edgeTypes}
            onNodeClick={onNodeClick}
          >
            <Controls position="bottom-right" />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
