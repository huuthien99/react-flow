import api from "../axios";

export const getAllProcedure = () => api.get("/procedure");
