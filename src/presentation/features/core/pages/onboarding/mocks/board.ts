export const mockBoardData = {
  lanes: [
    {
      id: "lane1",
      title: "Pending",
      cards: [
        {
          id: "Card1",
          title: "Write Blog which is very long",
          description: "Can AI make memes",
          tags: [{ title: "ETA: 12 Nov" }],
          draggable: false,
        },
        {
          id: "Card2",
          title: "Pay Rent",
          description: "Transfer via NEFT",
          label: "5 mins",
          metadata: { sha: "be312a1" },
        },
      ],
    },
    {
      id: "lane2",
      title: "Ongoing",
      cards: [],
    },
    {
      id: "lane3",
      title: "Blocked",
      cards: [],
    },
    {
      id: "lane4",
      title: "Completed",
      cards: [],
    },
  ],
};

