import ProcedureContainer from "@/containers/ProcedureContainer";
import PrivateLayout from "@/layouts/PrivateLayout";
import { Outlet } from "react-router-dom";

function ProcedurePage() {
  return (
    <PrivateLayout>
      <ProcedureContainer />
    </PrivateLayout>
  );
}

export default ProcedurePage;
