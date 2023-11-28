import { ReactElement } from "react";
import { SideMenu } from "@crstl/components/molecules/side-menu";
import {
  getLogoutMenuConfig,
  getSideMenuTriggerConfig,
} from "../menu-wrapper/config";
import { useUserDetails } from "presentation/hooks/common";
import { Separator } from "./styles";
import { useHistory } from "react-router-dom";
import { logout } from "domain/interactors/auth/service";
import { LOGIN } from "globals/configs";
import { useFlags } from "launchdarkly-react-client-sdk";

export const Trigger = (): ReactElement => {
  const history = useHistory();

  const flags = useFlags();

  const [{ data: userDetailsStateData }] = useUserDetails();
  const userFullName = userDetailsStateData?.fullName;
  const userName = userFullName?.split(" ")[0] ?? "Profile";

  const handleLogoutClick = () => {
    logout();
  };

  const settingsMenuItems = getSideMenuTriggerConfig({ flags, userName });
  const logoutMenuItems = getLogoutMenuConfig({ handleLogoutClick });

  return (
    <>
      <SideMenu theme="dark" data={settingsMenuItems} />
      <Separator />
      <SideMenu theme="dark" data={logoutMenuItems} />
    </>
  );
};

