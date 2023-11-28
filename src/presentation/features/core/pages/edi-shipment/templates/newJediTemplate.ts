import _ from "lodash";

const mainJson = `{
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
                    "set": "856",
                    "heading": <%= heading %>,
                    "detail": {
                      "hierarchical_level_HL_shipment": <%= shipment %>,
                      "hierarchical_level_HL_order": <%= order %>,
                      "hierarchical_level_HL_P_loop": [<%= packs %>],
                      "hierarchical_level_HL_I_loop": [<%= items %>]
                    },
                    "summary": <%= summary %>
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

const mainTemplate = _.template(mainJson);

export { mainTemplate };
