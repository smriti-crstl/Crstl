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

export { getSafeCodeName, getDisplayNameForCode, formatDate };
