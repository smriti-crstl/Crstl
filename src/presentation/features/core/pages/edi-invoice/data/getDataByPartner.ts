import _ from "lodash";
import targetMappingGuide from "./targetMappingGuide.json";
import {
  Customizations,
  DropdownOption,
  DropdownType,
  TargetMappingGuide,
} from "./targetMappingGuideTypes";

type properties = keyof Customizations;

enum PartnerEnum {
  Target = "target",
}

function getCodeNames(
  customizations: Customizations,
  customizationPath: properties
): string[] {
  const value = customizations[customizationPath] as DropdownType;

  const result = value?.codes || [];

  return result;
}

function getDataByPartner(
  partnerName: PartnerEnum,
  data: DropdownOption[],
  customizationPath: properties
) {
  if (partnerName !== PartnerEnum.Target) {
    return [];
  }
  const {
    overrides,
    customizations,
  } = targetMappingGuide as TargetMappingGuide;

  const customizationCodes = getCodeNames(customizations, customizationPath);

  const overrideCodes = getCodeNames(overrides, customizationPath);

  const codes = _.union(customizationCodes, overrideCodes);

  const filteredData = data?.filter((option: DropdownOption) =>
    codes.includes(option.value)
  );

  return filteredData;
}

const getDataByPartnerCurried = _.curry(getDataByPartner, 3);

const getTargetData = getDataByPartnerCurried(PartnerEnum.Target);

export { getTargetData };
