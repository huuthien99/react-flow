import { getDetailProcedure, updateProcedure } from "@/adapter/procedure";
import Header from "@/components/header/Header";
import DnDContainer from "@/dndComponent/DnDContainer";
import PrivateLayout from "@/layouts/PrivateLayout";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProcedureDetailPage() {
  const { id } = useParams();

  const [procedure, setProcedure] = useState(() => []);
  const [selected, setSelected] = useState(() => {});
  const navigate = useNavigate();

  const getDetail = async () => {
    try {
      const res = await getDetailProcedure(id);
      if (res?.data) {
        const newData = {
          ...res?.data,
          id: res?.data._id,
        };
        setSelected(newData);
        setProcedure([...procedure, newData]);
      }
    } catch (error) {
      console.log("🚀 ~ getDetail ~ error:", error);
    }
  };

  useEffect(() => {
    getDetail();
  }, [id]);

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

  const handleAddNewTab = () => {};

  const handleSelect = () => {};

  const handleUpdate = async (data) => {
    try {
      const res = await updateProcedure(id, data);
      if (res?.data) {
        const newData = {
          ...res?.data,
          id: res?.data._id,
        };
        setSelected(newData);

        const exist = procedure?.findIndex((item) => item.id === newData.id);
        const newList = [...procedure];
        if (exist !== -1) {
          newList.splice(exist, 1, newData);
          setProcedure(newList);
        } else {
          // setProcedure([...procedure, newData]);
        }
      }
    } catch (error) {
      console.log("🚀 ~ handleUpdate ~ error:", error);
    }
  };

  return (
    <PrivateLayout>
      <div className="overflow-hidden">
        <Header
          handleDelete={handleDelete}
          procedure={procedure}
          handleAddNewTab={handleAddNewTab}
          selectedId={selected?.id}
          handleSelect={handleSelect}
          handleUpdate={handleUpdate}
        />
        <div className="h-[calc(100vh-4rem)]">
          <DnDContainer
            defaultNodes={selected?.nodes || []}
            defaultEdges={selected?.edges || []}
          />
        </div>
      </div>
    </PrivateLayout>
  );
}

export default ProcedureDetailPage;
