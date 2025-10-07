import {
  deleteProcedure,
  getAllProcedure,
  updateProcedure,
} from "@/adapter/procedure";
import Cart from "@/components/Cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { debounce } from "lodash";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

function ProcedureContainer() {
  const [list, setList] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "all";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const [keyword, setKeyword] = useState(() => search);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const navigate = useNavigate();

  const fetchProcedures = async () => {
    setLoading(true);
    try {
      const res = await getAllProcedure({ search, type, page, limit });
      if (res) {
        setList(res.data);
        setPagination(res?.pagination);
      }
    } catch (error) {
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProcedures();
  }, [search, type, page, limit]);

  const handleDelete = async (id) => {
    try {
      const res = await deleteProcedure(id);
      toast.success(res?.message, { position: "top-right" });
      fetchProcedures();
    } catch (error) {
      toast.error("Error", { position: "top-right" });
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const res = await updateProcedure(id, data);
      toast.success(res?.message, { position: "top-right" });
      fetchProcedures();
    } catch (error) {
      toast.error("Error", { position: "top-right" });
    }
  };

  const handleNavigateDetail = (id) => {
    navigate(`/procedure/${id}`);
  };

  const handleChangeSelectType = (newFilters) => {
    const data = { ...newFilters, page: 1 };
    const nextParams = new URLSearchParams(searchParams);
    Object.entries(data).forEach(([key, value]) => {
      if (value) nextParams.set(key, value);
      else nextParams.delete(key);
    });
    setSearchParams(nextParams);
  };

  const debounceChange = useCallback(
    debounce((nextValue) => handleChangeSelectType(nextValue), 1000),
    []
  );

  const onChangeInput = (e) => {
    setKeyword(e.target.value);
  };

  // pagination change
  const handleChangePage = (newPage) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", newPage);
    setSearchParams(nextParams);
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header filter */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Input
            value={keyword}
            onChange={(e) => {
              onChangeInput(e);
              debounceChange({ search: e.target.value });
            }}
            className="w-[400px]"
            placeholder="Search"
          />

          {/* Select type */}
          <Select
            value={type}
            onValueChange={(value) => handleChangeSelectType({ type: value })}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="code">Code js</SelectItem>
              <SelectItem value="diagram">Diagram</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => navigate("/procedure/new", { state: "diagram" })}
          className="bg-emerald-400 hover:bg-emerald-500 rounded-[6px]"
        >
          Add Procedure
        </Button>
      </div>

      {/* List */}
      <div className="space-y-4">
        {loading && (
          <div className="flex justify-center items-center mt-10">
            Loading...
          </div>
        )}
        {!loading && list.length < 1 && (
          <div className="flex justify-center items-center mt-10">EMPTY</div>
        )}
        {!loading &&
          list?.map((item) => (
            <Fragment key={item._id}>
              <Cart
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                data={item}
                handleNavigateDetail={handleNavigateDetail}
              />
            </Fragment>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end w-full gap-2">
        {/* Select limit */}
        <Select
          value={String(limit)}
          onValueChange={(value) =>
            handleChangeSelectType({ limit: Number(value) })
          }
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 / page</SelectItem>
            <SelectItem value="10">10 / page</SelectItem>
            <SelectItem value="20">20 / page</SelectItem>
            <SelectItem value="50">50 / page</SelectItem>
          </SelectContent>
        </Select>
        <div>
          <Pagination className="justify-normal">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault();
                    handleChangePage(page - 1);
                  }}
                  className={page <= 1 ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>
              {[...Array(pagination.totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={(e) => {
                      e.preventDefault();
                      handleChangePage(i + 1);
                    }}
                    isActive={page === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault();
                    handleChangePage(page + 1);
                  }}
                  className={
                    page >= pagination.totalPages
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default ProcedureContainer;
