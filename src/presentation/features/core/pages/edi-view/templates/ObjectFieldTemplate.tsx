import { cloneDeep, get, set, startCase, trim } from "lodash";
import { currencyUSDFormatter } from "presentation/utils";
import React from "react";

import {
  ObjectFieldTemplatePropertyType,
  ObjectFieldTemplateProps,
} from "@rjsf/utils";

import { removeUserInput } from "../../edi-edit/helpers";
import { getLineItemsFromObject } from "../../edi/edi.utils";
import { lineItemTotalConfig, titleReplacements } from "../constants";
import { getKeyEndingIn } from "../helpers";

const getCleanTitle = (element: ObjectFieldTemplatePropertyType) => {
  const value = removeUserInput(element?.content?.props?.formData ?? "");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { "x12-codes": codes } = element?.content?.props?.schema as any;

  const splitArray = value.split("_");

  const shortValue = splitArray.pop() ?? "";

  const valueWithoutCode = startCase(splitArray.join(" "));

  return (
    codes?.[value]?.description ||
    codes?.[shortValue]?.description ||
    valueWithoutCode ||
    value
  );
};

// if a property has the word "qualifier" in it, copy that title to the next field i.e. _01 then _02 or _11 then _12
// if a property has the word "unit_or_basis_for_measurement_code" in it, append the value to the previous field
const updateProperties = (props: ObjectFieldTemplateProps) => {
  const clonedProps = cloneDeep(props);
  const updatedProperties: ObjectFieldTemplatePropertyType[] = [];
  for (let idx = 0; idx < clonedProps.properties.length; idx++) {
    const element = clonedProps.properties[idx];
    const segment = props.formContext?.schemaPath?.split("_")?.pop() ?? "";

    if (element.name.includes("qualifier")) {
      const nextElement = clonedProps.properties[idx + 1];
      set(nextElement, "content.props.schema.title", getCleanTitle(element));
      set(
        nextElement,
        "content.props.schema.description",
        trim(
          (element?.content?.props?.schema?.description ?? "") +
            " " +
            (nextElement?.content?.props?.schema?.description ?? "")
        )
      );
      updatedProperties.push(nextElement);
      idx++;
    } else if (element.name.includes("unit_or_basis_for_measurement_code")) {
      const prevElement = updatedProperties[updatedProperties.length - 1];
      if (prevElement) {
        set(
          prevElement,
          "content.props.formData",
          trim(
            (prevElement?.content?.props?.formData ?? "") +
              " " +
              getCleanTitle(element)
          )
        );
      } else {
        updatedProperties.push(element);
      }
    } else {
      const indexKey = element.name.split("_").pop() ?? "";
      const titleToReplace = get(titleReplacements, `${segment}.${indexKey}`);

      if (titleToReplace) {
        set(element, "content.props.schema.title", titleToReplace);
      }

      updatedProperties.push(element);
    }
  }
  return updatedProperties;
};

const getItemTotal = (props: ObjectFieldTemplateProps) => {
  const segment = props.formContext?.schemaPath?.split("_")?.pop() ?? "";

  if (!Object.keys(lineItemTotalConfig).includes(segment)) {
    return;
  }

  const keyIndexes = lineItemTotalConfig[segment];

  const keysToMultiply: string[] = [];
  keyIndexes.forEach((item) => {
    const key = getKeyEndingIn(props.formData, item);
    if (key) {
      keysToMultiply.push(key);
    }
  });

  if (keysToMultiply.length < 2) {
    return;
  }

  const total = keysToMultiply.reduce((acc, key) => {
    const value = parseFloat(get(props.formData, key, "0"));
    return acc * value;
  }, 1);

  return total;
};

const getProductDescription = (props: ObjectFieldTemplateProps) => {
  const segment = props?.formContext?.schemaPath?.split("_")?.pop() ?? "";

  if (segment !== "IT1") {
    return;
  }

  const { upc } = getLineItemsFromObject(props?.formData);
  const productDetails = get(
    props,
    "formContext.invoiceData.data.productDetails",
    []
  );

  const description = productDetails.find(
    (item: any) => item?.productId === upc
  )?.productDescription;

  return description;
};

function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
  if (!props?.formData || !Object.values(props?.formData)?.length) {
    return null;
  }

  const total = getItemTotal(props);

  const description = getProductDescription(props);

  const properties = updateProperties(props);

  return (
    <>
      {properties.map((element) => (
        <React.Fragment key={element?.name}>{element?.content}</React.Fragment>
      ))}
      {description && (
        <div>
          <span>Description:</span> <strong>{description}</strong>
        </div>
      )}
      {total && (
        <div>
          <span>Total:</span> <strong>{currencyUSDFormatter(total)}</strong>
        </div>
      )}
    </>
  );
}

export { ObjectFieldTemplate };

