import { RoomProvider } from "boot/wrappers/live-blocks";
import { ReactTourJoyride } from "boot/wrappers/react-joyride";
import { TourProvider } from "boot/wrappers/react-joyride/TourContext";
import { SearchFormDataProvider } from "presentation/features/common/components/Search/hooks/useSearchFormData";

import { createClient } from "@liveblocks/client";
import { LiveblocksProvider } from "@liveblocks/react";

import { CoreContainerLayout } from "./layout";
import { DownloadShipmentDocsProvider } from "../pages/edi/Download/DownloadShipmentDocs/hooks/useDownloadShipmentDocs";

const client = createClient({
  publicApiKey: import.meta.env.VITE_APP_LIVEBLOCKS_PUBLIC_KEY ?? "",
});

function CoreContainerLayoutWithProviders() {
  return (
    <LiveblocksProvider client={client}>
      <RoomProvider>
        <TourProvider>
          <SearchFormDataProvider>
            <DownloadShipmentDocsProvider>
              <CoreContainerLayout />
              <ReactTourJoyride />
            </DownloadShipmentDocsProvider>
          </SearchFormDataProvider>
        </TourProvider>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

export default CoreContainerLayoutWithProviders;

