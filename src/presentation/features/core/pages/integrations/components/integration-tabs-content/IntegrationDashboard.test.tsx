import { IntegrationStatusModelRes } from "domain/entity/integrations/models";
import moment from "moment";

function render(_: unknown, tableRow: IntegrationStatusModelRes) {
  const { lastReAuthorizedAt, lastReAuthorizedBy } = tableRow;

  const safeLastReauthorizedAt = lastReAuthorizedAt?.replace(/^-/, "");
  const safeLastReauthorizedBy = lastReAuthorizedBy?.replace(/^-/, "");

  if (safeLastReauthorizedAt && safeLastReauthorizedBy) {
    const formattedDate = moment(lastReAuthorizedAt).format(
      "MMM DD, YYYY, h:mm A"
    );
    return `${lastReAuthorizedAt} on ${formattedDate}`;
  }

  return "N/A";
}

test("should return correct data", () => {
  const tableRow: IntegrationStatusModelRes = {
    addedBy: "Mrinal Sen",
    currentStatus: "OK",
    firstAddedAt: "2021-08-27T09:38:36.131Z",
    imageUrl: "https://i.ibb.co/rm0XVXb/finance.png",
    integrationType: "Finance",
    lastReAuthorizedAt: "2021-12-16T10:57:04.682+00:00",
    lastReAuthorizedBy: "Dipti Demo",
    lastUpdatedAt: "2022-01-16T08:43:03.031Z",
    source: "Chase",
  };
});
