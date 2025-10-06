import { getAllProcedure } from "@/adapter/procedure";
import Cart from "@/components/Cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProcedureContainer() {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState("all");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProcedures = async () => {
      setLoading(true);
      try {
        const res = await getAllProcedure();
        console.log("🚀 ~ fetchProcedures ~ res:", res);
        if (res) {
          setList(res.data);
        }
      } catch (error) {
        setList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProcedures();
  }, []);

  const navigate = useNavigate();

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
        {list?.map((item) => (
          <Cart key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
}

export default ProcedureContainer;
