import clsx from "clsx";
import { isEmpty } from "lodash";

import { ArrayFieldTemplateProps } from "@rjsf/utils";

import { BorderedSubFormWrapper } from "../EdiViewPage.styles";
import { SectionTitle } from "./SectionTitle";

function ArrayFieldTemplate(props: ArrayFieldTemplateProps) {
  const hasDataInArrays = !!props?.items?.filter(
    ({ children }) => !isEmpty(children?.props?.formData)
  ).length;

  if (!props?.items?.length || !hasDataInArrays) {
    return null;
  }

  const isLoop = props.idSchema.$id.endsWith("loop") ?? false;

  const isHlLoop =
    props.idSchema.$id.endsWith("HL_loop_shipment") ||
    props.idSchema.$id.endsWith("HL_loop_order") ||
    props.idSchema.$id.endsWith("HL_loop_tare") ||
    props.idSchema.$id.endsWith("HL_loop_pack") ||
    props.idSchema.$id.endsWith("HL_loop_item");

  return (
    <>
      {/* {isLoop ? null : <SectionTitle title={props?.title} />} */}
      {props.items.map(({ key, children }: any) => {
        return (
          <BorderedSubFormWrapper
            className={clsx({
              "loop-item-row": isLoop,
              "hl-loop-item-row": isHlLoop,
            })}
            key={key}
          >
            {children}
          </BorderedSubFormWrapper>
        );
      })}
    </>
  );
}

export { ArrayFieldTemplate };

