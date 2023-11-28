import clsx from "clsx";
import { BorderedSubFormWrapper } from "../styles";
import { SectionTitle } from "./SectionTitle";

function ArrayFieldTemplate(props: any) {
  const isLoop = props.idSchema.$id.endsWith("loop") ?? false;

  const isHlLoop =
    props.idSchema.$id.endsWith("HL_loop_shipment") ||
    props.idSchema.$id.endsWith("HL_loop_order") ||
    props.idSchema.$id.endsWith("HL_loop_tare") ||
    props.idSchema.$id.endsWith("HL_loop_pack") ||
    props.idSchema.$id.endsWith("HL_loop_item");

  return (
    <>
      {isLoop || isHlLoop ? null : <SectionTitle title={props?.title} />}
      {props.items.map((element: any) => {
        return (
          <BorderedSubFormWrapper
            className={clsx({
              "loop-item-row": isLoop,
            })}
            key={element.key}
          >
            {element.children}
          </BorderedSubFormWrapper>
        );
      })}
    </>
  );
}

export { ArrayFieldTemplate };

