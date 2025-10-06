import { createProcedure } from "@/adapter/procedure";
import Header from "@/components/header/Header";
import DnDContainer from "@/dndComponent/DnDContainer";
import PrivateLayout from "@/layouts/PrivateLayout";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const initNodes = [
  {
    id: uuidv4(),
    type: "start",
    data: { label: "Start" },
    position: { x: 200, y: 100 },
    selected: false,
  },
];

function ProcedureAddPage() {
  const { state } = useLocation();

  const [procedure, setProcedure] = useState(() => [
    {
      id: uuidv4(),
      name: "Workflow 1",
      nodes: initNodes,
      edges: [],
      description: "",
      type: state,
    },
  ]);

  const navigate = useNavigate();

  const handleDelete = (data) => {
    if (procedure.length < 2) {
      setSelected(null);
      navigate("/procedure");
    } else {
      setProcedure((prev) => {
        const exist = prev.findIndex((item) => item.id === data.id);

        const newData = [...prev];
        setSelected(newData[exist - 1]);
        newData.splice(exist, 1);
        return newData;
      });
    }
  };

  const handleAddNewTab = () => {
    const newData = {
      id: uuidv4(),
      name: `Workflow ${procedure.length + 1}`,
      nodes: initNodes,
      edges: [],
      description: "",
      type: state,
    };
    setProcedure((prev) => {
      return [...prev, newData];
    });

    setSelected(newData);
  };

  const [selected, setSelected] = useState(() => procedure[0]);

  const handleSelect = (data) => {
    setSelected(data);
  };

  const handleAddProcedure = async (data) => {
    try {
      const res = await createProcedure(data);
      if (res?.data) {
        const newObj = {
          ...res.data,
          id: res.data._id,
        };

        setProcedure((prev) => {
          const newData = [...prev];
          const exist = prev.findIndex((item) => item.id === selected.id);

          if (exist !== -1) {
            newData.splice(exist, 1, newObj);
          }

          setSelected(newObj);
          return newData;
        });
      }
    } catch (error) {
      console.log("🚀 ~ handleAddProcedure ~ error:", error);
    }
  };

  return (
    <PrivateLayout>
      <div className="h-full overflow-x-hidden">
        <Header
          handleDelete={handleDelete}
          procedure={procedure}
          handleAddNewTab={handleAddNewTab}
          selectedId={selected?.id}
          handleSelect={handleSelect}
          handleAddProcedure={handleAddProcedure}
        />
        <div className="max-h-[calc(100vh-4rem)]">
          <DnDContainer
            defaultNodes={selected?.nodes || []}
            defaultEdges={selected?.edges || []}
          />
        </div>
      </div>
    </PrivateLayout>
  );
}

export default ProcedureAddPage;
