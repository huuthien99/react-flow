import api from "../axios";

export const getAllProcedure = () => api.get("/procedure");
export const deleteProcedure = (id) => api.delete(`/procedure/${id}`);
export const getDetailProcedure = (id) => api.get(`/procedure/${id}`);
export const createProcedure = (data) => api.post("/procedure", data);

export const updateProcedure = (id, data) =>
  api.patch(`/procedure/${id}`, data);
