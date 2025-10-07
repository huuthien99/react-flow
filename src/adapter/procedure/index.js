import api from "../axios";

export const getAllProcedure = (data = {}) => {
  const params = {
    ...data,
    type: data?.type || "all",
    page: data?.page || 1,
    limit: data?.limit || 10,
  };
  return api.get("/procedure", { params });
};

export const deleteProcedure = (id) => api.delete(`/procedure/${id}`);
export const getDetailProcedure = (id) => api.get(`/procedure/${id}`);
export const createProcedure = (data) => api.post("/procedure", data);

export const updateProcedure = (id, data) =>
  api.patch(`/procedure/${id}`, data);
