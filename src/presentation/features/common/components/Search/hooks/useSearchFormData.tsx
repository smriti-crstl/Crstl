import { AdvancedSearchDocsType } from "domain/entity/shared/models";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

const initialFormData = {};

export const SearchFormDataContext = createContext<{
  formData: AdvancedSearchDocsType;
  setFormData: Dispatch<SetStateAction<AdvancedSearchDocsType>>;
}>({
  formData: initialFormData,
  setFormData: () => undefined,
});
SearchFormDataContext.displayName = "SearchFormDataContext";

export function SearchFormDataProvider(props: any) {
  const [formData, setFormData] = useState();

  const value = useMemo(
    () => ({
      formData,
      setFormData,
    }),
    [setFormData, formData]
  );

  return <SearchFormDataContext.Provider value={value} {...props} />;
}

export function useSearchFormData(): {
  formData: AdvancedSearchDocsType;
  setFormData: Dispatch<SetStateAction<AdvancedSearchDocsType>>;
} {
  const context = useContext(SearchFormDataContext);

  if (!context) {
    throw new Error(
      "useSearchFormData must be used within a SearchFormDataProvider"
    );
  }

  return context;
}

