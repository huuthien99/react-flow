export const replaceSourceHandle = (e, newIdMap) => {
  let newSourceHandle = e.sourceHandle;

  if (e.sourceHandle?.includes("out-green-condition")) {
    const oldConditionId = e.sourceHandle.split("-out-green-condition")[0];
    const newConditionId = newIdMap[oldConditionId];
    newSourceHandle = `${newConditionId}-out-green-condition`;
  } else if (e.sourceHandle?.includes("out-fallback")) {
    newSourceHandle = `${newIdMap[e.source]}-out-fallback`;
  } else if (e.sourceHandle?.includes("out-green-next")) {
    newSourceHandle = `${newIdMap[e.source]}-out-green-next`;
  } else if (e.sourceHandle?.includes("out-green")) {
    newSourceHandle = `${newIdMap[e.source]}-out-green`;
  } else if (e.sourceHandle?.includes("out-red")) {
    newSourceHandle = `${newIdMap[e.source]}-out-red`;
  }

  return newSourceHandle;
};
