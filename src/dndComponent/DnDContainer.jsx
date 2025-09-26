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

import { useAppContext } from "@/App";
import Header from "@/components/header/Header";
import SideBar from "@/components/SideBar";
import { Color_line, typeNodes } from "@/constants/constants";
import { useDialog } from "@/context/DialogContext";
import { useDnD } from "@/context/DnDContext";
import { v4 as uuidv4 } from "uuid";
import CustomEdge from "./CustomEdges";
import DialogDnD from "./DialogDnD";
import { useEffect } from "react";
import StartNode from "@/nodes/StartNode";
import CustomNode from "./CustomNode";

const initialNodes = [
  {
    id: uuidv4(),
    type: "start",
    data: { label: "Start" },
    position: { x: 200, y: 100 },
  },
];

const edgeTypes = {
  custom: CustomEdge,
};

const nodeTypes = {
  start: StartNode,
  custom: CustomNode,
};

function DnDContainer() {
  const [type] = useDnD();
  const { setOpen, setSelectedNode } = useDialog();
  const [options] = useAppContext();

  const savedNodes = localStorage.getItem("reactFlowNodes");
  const savedEdges = localStorage.getItem("reactFlowEdges");

  const parsedNodes = savedNodes ? JSON.parse(savedNodes) : initialNodes;
  const parsedEdges = savedEdges ? JSON.parse(savedEdges) : [];

  const reactFlowWrapper = useRef(null);
  const [edges, setEdges, onEdgesChange] = useEdgesState(() => parsedEdges);
  const [nodes, setNodes, onNodesChange] = useNodesState(() => parsedNodes);

  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "custom",
            animated: options.animated,
          },
          eds
        )
      ),
    [options.animated]
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
        id: uuidv4(),
        type: "custom",
        position,
        keyWord: type,
        data: {
          label: typeNodes[type].label,
          ...(typeNodes[type].dataDefault || {}),
        },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, type]
  );

  const onNodeClick = (_, node) => {
    if (node.type === "input") return;
    setOpen(true);
    setSelectedNode(node);
  };

  useEffect(() => {
    setEdges((eds) =>
      eds.map((e) => {
        return {
          ...e,
          animated: options.animated,
        };
      })
    );
  }, [options.animated]);

  useEffect(() => {
    if (options.isAutoSave) {
      const prevNodes = localStorage.getItem("reactFlowNodes");
      const nextNodes = JSON.stringify(nodes);
      const prevEdges = localStorage.getItem("reactFlowEdges");
      const nextEdges = JSON.stringify(edges);
      if (prevEdges !== nextEdges) {
        localStorage.setItem("reactFlowEdges", nextEdges);
      }
      if (prevNodes !== nextNodes) {
        localStorage.setItem("reactFlowNodes", nextNodes);
      }
    }
  }, [nodes, options.isAutoSave, edges]);

  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    console.log("Right clicked node:", node);
  }, []);

  return (
    <div className="dndflow">
      <SideBar />
      <div className="w-full h-[calc(100vh-4rem)]">
        <Header />
        <DialogDnD />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onDrop={onDrop}
            onConnect={onConnect}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeContextMenu={onNodeContextMenu}
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
