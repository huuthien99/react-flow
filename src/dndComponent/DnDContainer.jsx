import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useRef } from "react";

import { useAppContext } from "@/App";
import Header from "@/components/header/Header";
import SideBar from "@/components/SideBar";
import { dialogTypes, typeNodes } from "@/constants/constants";
import { useDialog } from "@/context/DialogContext";
import { useDnD } from "@/context/DnDContext";
import StartNode from "@/nodes/StartNode";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CustomEdge from "./CustomEdges";
import CustomNode from "./CustomNode";
import DialogDnD from "./DialogDnD";
import DnDMenuClickRight from "./DnDMenuClickRight";
import ConditionNode from "./ConditionNode";

const initialNodes = [
  {
    id: uuidv4(),
    type: "start",
    data: { label: "Start" },
    position: { x: 200, y: 100 },
    selected: false,
  },
];

const edgeTypes = {
  custom: CustomEdge,
};

const nodeTypes = {
  start: StartNode,
  custom: CustomNode,
  condition: ConditionNode,
};

function DnDContainer() {
  //state react
  const reactFlowWrapper = useRef(null);
  const [openContextMenu, setOpenContextMenu] = useState(null);

  //state from context
  const [type] = useDnD();
  const [options] = useAppContext();
  const { setOpen, setSelectedNode, setDialogType } = useDialog();
  const { screenToFlowPosition } = useReactFlow();

  const savedNodes = localStorage.getItem("reactFlowNodes");
  const savedEdges = localStorage.getItem("reactFlowEdges");

  const parsedNodes = savedNodes ? JSON.parse(savedNodes) : initialNodes;
  const parsedEdges = savedEdges ? JSON.parse(savedEdges) : [];

  const [edges, setEdges, onEdgesChange] = useEdgesState(() => parsedEdges);
  const [nodes, setNodes, onNodesChange] = useNodesState(() => parsedNodes);

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
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: uuidv4(),
        type: type === "CONDITION_NODE" ? "condition" : "custom",
        position,
        selected: false,
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
    if (node.type === "start" || node.type === "group") return;
    setOpen(true);
    setDialogType(dialogTypes.NODE);
    setSelectedNode(node);
  };

  // update edge when change option animated
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

  // auto save
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

  // right click item node
  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    if (node.type === "start") return;
    const pane = reactFlowWrapper.current.getBoundingClientRect();
    setOpenContextMenu({
      id: node.id,
      x: event.clientX - pane.left,
      y: event.clientY - pane.top,
      open: true,
      type: "single",
      isGroup: node.type === "group",
    });
  }, []);

  const onSelectionContextMenu = useCallback((event, nodes) => {
    event.preventDefault();
    if (!nodes || nodes.length <= 1) return;

    const pane = reactFlowWrapper.current.getBoundingClientRect();

    setOpenContextMenu({
      ids: nodes.map((n) => n.id),
      x: event.clientX - pane.left,
      y: event.clientY - pane.top,
      open: true,
      type: "multi",
    });
  }, []);

  const onPaneClick = useCallback(() => setContextMenu(null), []);

  return (
    <div className="dndflow">
      <SideBar />
      <div className="w-full h-[calc(100vh-4rem)]">
        <Header />
        <DialogDnD />
        <div ref={reactFlowWrapper} className="reactflow-wrapper">
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
            onSelectionContextMenu={onSelectionContextMenu}
            deleteKeyCode={["Delete", "Backspace"]}
            onPaneClick={onPaneClick}
          >
            <Background
              gap={options.diagramOptions.gap}
              size={options.diagramOptions.size}
              variant={options.diagramOptions.meshType}
              color={`rgba(0,0,0,${options.diagramOptions.transparent / 100})`}
            />
            <Controls position="bottom-right" />
            {openContextMenu && (
              <DnDMenuClickRight
                openContextMenu={openContextMenu}
                setOpenContextMenu={setOpenContextMenu}
              />
            )}
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}

export default DnDContainer;
