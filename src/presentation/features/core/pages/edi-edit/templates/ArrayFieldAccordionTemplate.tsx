import { Collapse } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import _ from "lodash";
import {
  BorderedSubFormWrapper,
  SubFormFieldsWrapper,
  SubFormRemoveButtonWrapper,
} from "../EdiEditPage.styles";
import { AddButton } from "./AddButton";
import { StyledCollapse, SubFormContainer } from "./styles";

const { Panel } = Collapse;

/**
 * TODO: we need to get ID and accordion for object fields, not array fields.
 *
 * formData is an array of objects and we take the value of either marks_and_numbers_02 property or
 * a nested property item_identification_LIN.product_service_id_03 of the first object in the array and
 * return that as the id value
 *
 * ! Note: we only pick up the first item, [0].${id} -> we might need to refactor code to support more fields / array indices!
 * // function getId(formData: Record<string, string>[]) {
 * //   const ids = [
 * //     "marks_and_numbers_02",
 * //     "item_identification_LIN.product_service_id_03",
 * //   ];
 * //   const formValues = ids.map((id) => get(formData, `[0].${id}`, null));
 * //   const [idValue] = compact(formValues);
 * //   return idValue;
 * // }
 * */

function ArrayFieldAccordionTemplate(props: any) {
  const { title } = props;

  const doChildrenHaveError = (data: any) => {
    return data?.some((item: any) => {
      const obj = item?.children?.props?.errorSchema || {};
      const isEmpty = _.isEmpty(obj);
      return !isEmpty;
    });
  };

  const isError = doChildrenHaveError(props?.items);

  const extraProps = isError ? { activeKey: [title] } : {};
  return (
    <StyledCollapse destroyInactivePanel {...extraProps}>
      <Panel header={title} key={title}>
        {props.items.map((element: any) => {
          return (
            <BorderedSubFormWrapper key={element.key}>
              <SubFormContainer>
                {element.hasRemove && (
                  <SubFormRemoveButtonWrapper>
                    <DeleteOutlined
                      style={{ fontSize: 18 }}
                      onClick={element.onDropIndexClick(element.index)}
                    />
                  </SubFormRemoveButtonWrapper>
                )}
                <SubFormFieldsWrapper>{element.children}</SubFormFieldsWrapper>
              </SubFormContainer>
            </BorderedSubFormWrapper>
          );
        })}
        {props.canAdd && (
          <AddButton title={title} onAddClick={props.onAddClick} />
        )}
      </Panel>
    </StyledCollapse>
  );
}

export { ArrayFieldAccordionTemplate };

