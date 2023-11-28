import _ from "lodash";
import { getSafeNumber } from "presentation/utils";
import { SourceJSON } from "../types/sourceJson";

function createHierarchicalIds(sourceJson: SourceJSON) {
  const packLoop = sourceJson?.HL_P_loop;

  const packIds = packLoop?.map((pack) => getSafeNumber(pack.HL_01_628)) ?? [];
  const itemIds =
    packLoop?.flatMap((pack) =>
      pack.HL_I_Loop?.map((item) => getSafeNumber(item?.HL_01_628))
    ) ?? [];

  return new Set([...packIds, ...itemIds]);
}

function createUniqueId(idSet: Set<number | undefined>) {
  const currentMaxValue = _.max(Array.from(idSet)) ?? 0;
  const newMaxValue = currentMaxValue + 1;
  return newMaxValue;
}

export { createHierarchicalIds, getSafeNumber, createUniqueId };
