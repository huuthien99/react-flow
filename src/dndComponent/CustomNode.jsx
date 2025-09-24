// import { Handle, Position } from "@xyflow/react";
// import { useState } from "react";

// function CustomNode({ data }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <div
//       style={{
//         padding: "10px 20px",
//         border: "1px solid #333",
//         borderRadius: "8px",
//         background: "#fff",
//         cursor: "pointer",
//         position: "relative",
//       }}
//       onClick={() => setOpen(true)}
//     >
//       {data.label || "Custom Node"}

//       <Handle type="target" position={Position.Top} />
//       <Handle type="source" position={Position.Bottom} />

//       {open && (
//         <div
//           style={{
//             position: "absolute",
//             top: "100%",
//             left: "50%",
//             transform: "translateX(-50%)",
//             marginTop: "8px",
//             background: "#fff",
//             border: "1px solid #ccc",
//             borderRadius: "6px",
//             padding: "10px",
//             zIndex: 10,
//             boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
//           }}
//         >
//           <p>Popup content cho node</p>
//           <button onClick={() => setOpen(false)}>Đóng</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CustomNode;
