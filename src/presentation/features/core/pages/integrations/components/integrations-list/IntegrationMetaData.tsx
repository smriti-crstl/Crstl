import { useTimestamp } from "presentation/hooks/common/use-timestamp";

import { SubParagraph } from "components/atoms/typography/paragraph/subParagraph";

type Props = {
  createdAt?: string;
  createdBy?: string;
  lastReAuthedAt?: string;
  lastReAuthedBy?: string;
};

/* eslint-disable @typescript-eslint/explicit-function-return-type */
function IntegrationMetaData({
  createdAt,
  createdBy,
  lastReAuthedAt,
  lastReAuthedBy,
}: Props) {
  const { getZonedTime } = useTimestamp();

  if (!createdAt) {
    return null;
  }

  const formattedCreatedAtDate = getZonedTime({
    ISODateString: createdAt,
    withAltLabel: true,
  });

  const formattedLastAuthedAtDate = lastReAuthedAt
    ? getZonedTime({ ISODateString: lastReAuthedAt, withAltLabel: true })
    : "";

  return (
    <div style={{ marginTop: 8 }}>
      <span>
        <SubParagraph style={{ fontSize: 12, marginBottom: 4 }}>
          Added {createdBy ? `by ${createdBy}` : ""} on {formattedCreatedAtDate}
        </SubParagraph>
        {formattedLastAuthedAtDate && (
          <SubParagraph
            data-testid="reauth-text"
            style={{ fontSize: 12, marginBottom: 4 }}
          >
            Last re-authorized {lastReAuthedBy ? `by ${lastReAuthedBy}` : ""} on{" "}
            {formattedLastAuthedAtDate}
          </SubParagraph>
        )}
      </span>
    </div>
  );
}

export { IntegrationMetaData };

