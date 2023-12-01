// * Commenting out the sub-tabs related code and just returning the Marketplace component
import { Marketplace } from "./components/marketplace";

// import { CORE_INTEGRATIONS } from "globals/configs";
// import { ReactElement } from "react";
// import { generatePath, useHistory, useParams } from "react-router-dom";

// import { Tabs } from "components/atoms/tabs";

// import { INTEGRATIONS_TABS_CONFIG } from "./config";

// const CoreIntegrations = (): ReactElement => {
//   const history = useHistory();
//   const { type: currentType } = useParams<{ type: string }>();

//   const onIntegrationsTabClick = (tabKey: string): void => {
//     history.replace(generatePath(CORE_INTEGRATIONS, { type: tabKey }));
//   };

//   return (
//     <Tabs
//       activeKey={currentType}
//       data={INTEGRATIONS_TABS_CONFIG}
//       onTabClick={onIntegrationsTabClick}
//     />
//   );
// };

const CoreIntegrations: React.FC = () => {
  return <Marketplace />;
};

export { CoreIntegrations as default };

