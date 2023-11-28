import {
  useUserDetailsQuery,
  useUserTeamQuery,
} from "domain/interactors/shared";
import { uniqueId } from "lodash";
import { useEffect } from "react";

import { RoomProvider as LiveblocksRoomProvider } from "@liveblocks/react";

const AvatarColorPallete = [
  "#3FC9C1",
  "#B3DE6D",
  "#F5D679",
  "#F2C79B",
  "#FFADC3",
  "#E8BAFE",
  "#C79EFF",
  "#7D9AFF",
  "#1DB5E3",
  "#93D9F6",
];
function RoomProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useUserDetailsQuery();

  const { isLoading: isTeamLoading, data: teamsData } = useUserTeamQuery(
    data?.organizationId || "",
    {
      enabled: !!data?.organizationId,
    }
  );

  useEffect(() => {
    const AvatarColourMap: any = {};
    if (teamsData?.length) {
      teamsData.map(
        (user, index) =>
          (AvatarColourMap[user?.fullName || ""] =
            AvatarColorPallete[index % AvatarColorPallete.length])
      );
    }
    localStorage.setItem("avatar_color_map", JSON.stringify(AvatarColourMap));
  }, [teamsData]);

  const roomId = data?.organizationId ?? uniqueId("room");

  if (isLoading) {
    return null;
  }

  return (
    <LiveblocksRoomProvider id={roomId}>{children}</LiveblocksRoomProvider>
  );
}

export { RoomProvider };
