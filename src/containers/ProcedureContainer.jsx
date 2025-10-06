import {
  createProcedure,
  deleteProcedure,
  getAllProcedure,
  updateProcedure,
} from "@/adapter/procedure";
import Cart from "@/components/Cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ProcedureContainer() {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("all");

  const [loading, setLoading] = useState(false);
  const fetchProcedures = async () => {
    setLoading(true);
    try {
      const res = await getAllProcedure();
      if (res) {
        setList(res.data);
      }
    } catch (error) {
      setList([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProcedures();
  }, []);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const res = await deleteProcedure(id);
      toast.success(res?.message, {
        position: "top-right",
      });
      fetchProcedures();
    } catch (error) {
      toast.error("Error", {
        position: "top-right",
      });
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await updateProcedure(id, data);
      toast.success(res?.message, {
        position: "top-right",
      });
      fetchProcedures();
    } catch (error) {
      toast.error("Error", {
        position: "top-right",
      });
    }
  };

  // const handleCreate = async () => {
  //   const data = {
  //     name: "Flow 1",
  //     description: "",
  //   };
  //   const res = await createProcedure(data);
  //   if (res?.data) {
  //     navigate(`/procedure/${res.data?._id}`);
  //   }
  //   try {
  //   } catch (error) {}
  // };

  if (loading) {
    return <div className="flex items-center justify-center">Loading!!!!</div>;
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Input className={"w-[600px]"} placeholder="Search" />
          <Select
            value={selected}
            onValueChange={(value) => setSelected(value)}
          >
            <SelectTrigger className="w-[50%]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="code">Code js</SelectItem>
              <SelectItem value="diagram">Diagram</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => navigate("/procedure/new")}
          className={"bg-emerald-400 hover:bg-emerald-500 rounded-[6px]"}
        >
          Add Procedure
        </Button>
      </div>
      <div className="space-y-4">
        {!loading && list.length < 1 && (
          <div className="flex justify-center items-center mt-10">EMPTY</div>
        )}

        {list?.map((item) => (
          <Cart
            handleDelete={() => handleDelete(item?._id)}
            handleUpdate={handleUpdate}
            key={item._id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
}

export default ProcedureContainer;
