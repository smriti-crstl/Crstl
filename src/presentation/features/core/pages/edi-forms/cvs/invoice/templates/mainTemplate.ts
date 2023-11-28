import _ from "lodash";

const json = `{
  "status": 200,
  "code": "success",
  "data": {
    "file": {
      "json_edi": {
        "interchanges": [
          {
            "groups": [
              {
                "transaction_sets": [
                  {
                    "heading": <%= heading %>,
                    "detail": {
                      "baseline_item_data_invoice_IT1_loop": [<%= baselineItemLoop %>]
                    },
                    "summary": <%= summary %>,
                    "set": "810"
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
}`;

const mainTemplate = _.template(json);

export { mainTemplate };
