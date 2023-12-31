import { ReactElement } from "react";

import { GenericError } from "components/atoms/error";
import { GenericLoading } from "components/atoms/loading";
import { GenericHeading } from "components/atoms/typography";

import { HomeAccountCarousal, SlideDataSetProps } from "../carousal";

type Props = {
  text: string;
  slideData?: SlideDataSetProps;
  isLoading?: boolean;
  isError?: boolean;
};

export const HomeAccountDetails = ({
  text,
  slideData,
  isLoading,
  isError,
}: Props): ReactElement => {
  if (isError) {
    return <GenericError />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <GenericHeading $alignCenter size="MD" weight="MEDIUM">
        {text}
      </GenericHeading>
      {isLoading ? (
        <GenericLoading type="spinner" />
      ) : (
        <HomeAccountCarousal slideData={slideData} />
      )}
    </div>
  );
};
