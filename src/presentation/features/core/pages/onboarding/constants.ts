import { JetBridgeBoardDataRes } from "domain/entity/jetbridge/model";

export const emptyBoardData: JetBridgeBoardDataRes["data"] = {
  lanes: [
    {
      id: "pending",
      title: "To Do",
      style: {
        backgroundColor: "#FFFCF2",
        borderColor: "#F2C94C",
        borderWidth: 1,
        borderStyle: "solid",
      },
      cards: [],
    },
    {
      id: "ongoing",
      title: "In Progress",
      style: {
        backgroundColor: "#E8F6FF",
        borderColor: "#19ABFF",
        borderWidth: 1,
        borderStyle: "solid",
      },
      cards: [],
    },
    {
      id: "blocked",
      title: "Blocked",
      style: {
        backgroundColor: "#FFF0F0",
        borderColor: "#FF4D4F",
        borderWidth: 1,
        borderStyle: "solid",
      },
      cards: [],
    },
    {
      id: "paused",
      title: "Paused",
      style: {
        backgroundColor: "#F3F3F3",
        borderColor: "#757e78",
        borderWidth: 1,
        borderStyle: "solid",
      },
      cards: [],
    },
    {
      id: "completed",
      title: "Completed",
      style: {
        backgroundColor: "#E8F3EB",
        borderColor: "#34A853",
        borderWidth: 1,
        borderStyle: "solid",
      },
      cards: [],
    },
  ],
};

