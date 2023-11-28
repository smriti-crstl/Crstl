import { useLocation } from "react-router-dom";

function useSearchParams() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location?.search);
  return searchParams;
}

export { useSearchParams };
