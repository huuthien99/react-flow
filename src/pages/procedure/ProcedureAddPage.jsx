import Header from "@/components/header/Header";
import DnDContainer from "@/dndComponent/DnDContainer";
import PrivateLayout from "@/layouts/PrivateLayout";

function ProcedureAddPage() {
  return (
    <PrivateLayout>
      <div className="h-full overflow-hidden">
        <Header />
        <div className="max-h-[calc(100vh-4rem)]">
          <DnDContainer />
        </div>
      </div>
    </PrivateLayout>
  );
}

export default ProcedureAddPage;
