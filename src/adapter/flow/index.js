import api from "../axios";

export const runFlow = (data) => api.post("/flow/run", data);
