import axiosApi from "./axios.api";

export const getCoordsByRemision = async (remision) => {
  const res = await axiosApi.get("/tracking/get-coords-proxy", {
    params: { remision },
  });
  return res.data; // { msg, data? }
};
