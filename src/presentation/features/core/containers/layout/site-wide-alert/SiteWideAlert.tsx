import { useHistory } from "react-router-dom";
import { Alert, Button } from "antd";
import { useGetReAuthList } from "domain/interactors/integrations";
import { CORE_INTEGRATIONS_MY_INTEGRATIONS } from "globals/configs";

const localeFormatter = new Intl.ListFormat("en-US", {
  style: "long",
  type: "conjunction",
});

function SiteWideAlert() {
  const history = useHistory();
  const { data } = useGetReAuthList();
  const formattedList = localeFormatter.format(data);
  const formattedListSuffix = data.length === 1 ? "requires" : "require";
  const message = `${formattedList} ${formattedListSuffix} re-authorization.`;

  function onButtonClick() {
    history.push(CORE_INTEGRATIONS_MY_INTEGRATIONS);
  }

  const shouldRender = data.length;

  return shouldRender ? (
    <Alert
      type="warning"
      message={message}
      banner
      action={
        <Button size="small" danger onClick={onButtonClick}>
          Re-authorize
        </Button>
      }
    />
  ) : null;
}

export { SiteWideAlert };
