import { UserModel } from "@crstl/api/src/apis/models/User";
import { ContactEmail } from "domain/entity/alerts-tab/models";

export type AlertsTableCol = UserModel & ContactEmail;

