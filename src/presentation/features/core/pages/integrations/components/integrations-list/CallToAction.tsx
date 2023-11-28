import { ColoredButton } from "@crstl/components/atoms/buttons";
import { ConnectedIndicator } from "@crstl/components/atoms/indicators";
import { CORE_INTEGRATIONS_TEXT_CONSTANTS } from "presentation/texts-reservoir";

type Props = {
  assistedIntegration: boolean;
  isConnected: boolean;
  isLoading: boolean;
  ctaButtonText?: string;
  name: string;
  onClick: () => void;
};

function buildMailtoLink(integrationName = "") {
  const from = "support@crstl.so";
  const subject = encodeURIComponent(
    `Support request: Add integration for ${integrationName}`
  );
  const link = `mailto:${from}?subject=${subject}`;
  return link;
}

function CallToAction({
  name,
  assistedIntegration,
  isConnected,
  isLoading,
  ctaButtonText,
  onClick,
}: Props) {
  if (isConnected) {
    return <ConnectedIndicator />;
  }
  if (assistedIntegration) {
    return (
      <ColoredButton href={buildMailtoLink(name)}>Contact Crstl</ColoredButton>
    );
  }
  return (
    <ColoredButton loading={isLoading} onClick={onClick}>
      {ctaButtonText || CORE_INTEGRATIONS_TEXT_CONSTANTS.CTA_BUTTON.TEXT}
    </ColoredButton>
  );
}

export { CallToAction };
