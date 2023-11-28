import { useUserDetailsQuery } from "domain/interactors/shared";
import {
  CORE_EDI_LIST,
  CORE_EDI_LIST_WITH_PARAMS,
  CORE_EDI_SEARCH_VIEW_PAGE,
  CoreRouteOnboardingOptions,
} from "globals/configs";
import { useFlags } from "launchdarkly-react-client-sdk";
import { SearchBox } from "presentation/features/common/components/Search";
import { useUserDetails } from "presentation/hooks/common";
import { Types } from "presentation/hooks/contexts/reducers";
import { CORE_LAYOUT_TEXT_CONSTANTS } from "presentation/texts-reservoir/core/layout";
import { ReactElement, useLayoutEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";

import { LayoutWithDarkSider } from "@crstl/components/organisms/layouts";
import { useOthers, useUpdateMyPresence } from "@liveblocks/react";

import { CoreRouter } from "../../router";
import CoreLayoutMenuWrapper from "./menu-wrapper";
import { Trigger } from "./trigger";
import { createHeaderIconsData, getHeaderTitle } from "./utils/config";
import OrgNode from "./OrgNode";
import Backdrop from "./Backdrop";

export const CoreContainerLayout = (): ReactElement => {
  const [
    { data: userDetailsStateData, isLoading },
    dispatch,
  ] = useUserDetails();
  const { pathname } = useLocation();

  const moduleName = getHeaderTitle(pathname);
  // If context state changes, these should also change so SOT is context state
  const userName = userDetailsStateData?.fullName;

  const {
    isLoading: isQueryLoading,
    isFetching: isUserDataRefetching,
    data,
  } = useUserDetailsQuery();

  const ediPath =
    pathname.includes("edi") &&
    !pathname.includes("list") &&
    !pathname.includes(CoreRouteOnboardingOptions.EDI);

  useLayoutEffect(() => {
    dispatch({
      type: Types.IsUserDetailsLoading,
      payload: isQueryLoading,
    });
  }, [dispatch, isQueryLoading]);

  useLayoutEffect(() => {
    if (data) {
      dispatch({
        type: Types.AddUserDetails,
        payload: { data },
      });
    }
  }, [data, dispatch]);

  // Back button paths should include view keyword
  const showBackButton = pathname.includes("orders/view") || ediPath;

  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();

  const flags = useFlags();

  updateMyPresence({ name: data?.fullName });

  const widget =
    matchPath(pathname, {
      path: [
        CORE_EDI_LIST,
        CORE_EDI_LIST_WITH_PARAMS,
        CORE_EDI_SEARCH_VIEW_PAGE,
      ],
      exact: true,
      strict: true,
    }) && flags?.documentSearch ? (
      <SearchBox />
    ) : null;

  return (
    <>
      {isUserDataRefetching && <Backdrop />}
      <LayoutWithDarkSider
        showBackButton={showBackButton}
        trigger={<Trigger />}
        headerTitle={moduleName}
        menu={<CoreLayoutMenuWrapper />}
        logoText={
          <OrgNode
            name={data?.organizationName || ""}
            userDataLoading={isUserDataRefetching}
          />
        }
        iconsData={createHeaderIconsData({
          avatarText: isLoading
            ? CORE_LAYOUT_TEXT_CONSTANTS.HEADER.NAME_LOADING
            : userName,
        })}
        // siteWideAlert={<SiteWideAlert />}
        widget={widget}
        others={others}
      >
        <CoreRouter />
      </LayoutWithDarkSider>
    </>
  );
};

