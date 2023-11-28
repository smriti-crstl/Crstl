import { AxiosInstance } from "axios";

export const getAPIObjectFromInstance = (instance: AxiosInstance) => {
  return {
    get: instance.get,
    post: instance.post,
    put: instance.put,
    patch: instance.patch,
    delete: instance.delete,
    instance: { instance },
  };
};

