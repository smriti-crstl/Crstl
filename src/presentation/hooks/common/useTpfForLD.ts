import { useLDClient } from "launchdarkly-react-client-sdk";
import { getTpfNameFromListDoc } from "presentation/features/core/pages/edi/edi.utils";
import { useEffect } from "react";

import { useUserDetails } from "./user-user-details";

/**
 * add tpf to the user's custom context for LD - for the specific listDocument
 * @param listDocument - this is the response of the listDocument api call i.e. result.data
 */
export const useTpfForLD = (listDocument: unknown) => {
  const ldClient = useLDClient();
  const [{ data: userData }] = useUserDetails();

  useEffect(() => {
    const tpf = getTpfNameFromListDoc(listDocument)?.toLowerCase();

    if (!tpf || !userData?.email) {
      return;
    }

    ldClient?.identify({
      key: userData?.email,
      email: userData?.email,
      custom: {
        tpf,
      },
    });
  }, [ldClient, listDocument, userData?.email]);

  // remove tpf from the user's custom context for LD
  useEffect(() => {
    return () => {
      ldClient?.identify({
        key: userData?.email,
        email: userData?.email,
        custom: {
          tpf: "",
        },
      });
    };
  }, []);
};

