import _ from "lodash";
import targetMappingGuide from "./targetMappingGuide.json";
import cvsMappingGuide from "./cvsMappingGuide.json";
import {
  Customizations,
  DropdownOption,
  DropdownType,
  TargetMappingGuide,
} from "./targetMappingGuideTypes";

type properties = keyof Customizations;

enum PartnerEnum {
  Target = "target",
  CVS = "cvs",
}

function getCodeNames(
  customizations: Customizations,
  customizationPath: properties
): string[] {
  const value = customizations[customizationPath] as DropdownType;

  const result = value?.codes || [];

  return result;
}

function getGuide(partnerName: PartnerEnum) {
  if (partnerName === PartnerEnum.CVS) {
    return cvsMappingGuide;
  }

  return targetMappingGuide;
}

function getDataByPartner(
  partnerName: PartnerEnum,
  data: DropdownOption[],
  customizationPath: properties
) {
  if (partnerName !== PartnerEnum.Target) {
    return [];
  }
  const { overrides, customizations } = getGuide(partnerName); // targetMappingGuide as TargetMappingGuide;

  const customizationCodes = getCodeNames(
    customizations as any,
    customizationPath
  );

  const overrideCodes = getCodeNames(overrides as any, customizationPath);

  const codes = _.union(customizationCodes, overrideCodes);

  const filteredData = data?.filter((option: DropdownOption) =>
    codes.includes(option.value)
  );

  return filteredData;
}

const getDataByPartnerCurried = _.curry(getDataByPartner, 3);

const getTargetData = getDataByPartnerCurried(PartnerEnum.Target);

const getCvsData = getDataByPartnerCurried(PartnerEnum.CVS);

export { getTargetData, getCvsData };
