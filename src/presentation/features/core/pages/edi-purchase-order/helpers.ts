import moment from "moment";

interface DropdownList {
  value: string;
  label: string;
}

function getSafeCodeName(codeName?: string) {
  const delimitedCodeName = codeName?.split("_");
  const [safeCodeName] = delimitedCodeName?.reverse() ?? [];
  return safeCodeName ?? "";
}

function getDisplayNameForCode(codeName?: string, list?: DropdownList[]) {
  const safeCodeName = getSafeCodeName(codeName).toLowerCase();
  const option = list?.find(
    ({ value }) => value.toLowerCase() === safeCodeName
  );

  const displayName = option?.label ?? "";

  return displayName;
}

function formatDate(date?: string, format = "MM/DD/YYYY") {
  if (!date) {
    return "";
  }
  const parsedDate = moment(date, "YYYYMMDD");
  return parsedDate.format(format);
}

// moved here from walmartAllowanceList.tsx file
const getCodeName = (data: string) => {
  if (!data || typeof data !== "string") {
    return "";
  }

  const codeName = data.split("_");
  for (let i = 0; i < codeName.length; i++) {
    codeName[i] = codeName[i].charAt(0).toUpperCase() + codeName[i].slice(1);
  }
  codeName.pop();

  return codeName.join(" ");
};

export { getSafeCodeName, getDisplayNameForCode, formatDate, getCodeName };

