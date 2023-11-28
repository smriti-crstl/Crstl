import { DeleteOutlined } from "@ant-design/icons";

import {
  BorderedSubFormWrapper,
  SubFormFieldsWrapperQE,
  SubFormRemoveButtonWrapperQE,
} from "../EdiEditPage.styles";
import { AddButton } from "./AddButton";

function ArrayFieldTemplate(props: any) {
  const { title } = props;
  return (
    <>
      {props.items.map((element: any) => {
        return (
          <BorderedSubFormWrapper key={element.key}>
            {element.hasRemove && (
              <SubFormRemoveButtonWrapperQE>
                <DeleteOutlined
                  style={{ fontSize: 18 }}
                  onClick={element.onDropIndexClick(element.index)}
                />
              </SubFormRemoveButtonWrapperQE>
            )}
            <SubFormFieldsWrapperQE>{element.children}</SubFormFieldsWrapperQE>
          </BorderedSubFormWrapper>
        );
      })}
      {props.canAdd && (
        <AddButton title={title} onAddClick={props.onAddClick} />
      )}
    </>
  );
}

export { ArrayFieldTemplate };

