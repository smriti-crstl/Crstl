import { YAxisOptions } from "highcharts";
import {
  buildHighChartsOptions,
  defaultOptions,
  PartialHighChartsOptions,
} from "./highChartsConfig";

describe("buildHighChartsOptions", () => {
  it("returns default options when no overrides are supplied", () => {
    const config = buildHighChartsOptions();
    expect(config).toMatchObject(defaultOptions);
  });

  it("returns correct config when overrides for a nested object are supplied", () => {
    const textTransform = "lowercase";

    const overrides: PartialHighChartsOptions = {
      yAxis: {
        labels: {
          style: {
            textTransform,
          },
        },
      },
    };

    const config = buildHighChartsOptions(overrides);

    const configYAxis = config?.yAxis as YAxisOptions;

    expect(configYAxis?.labels?.style).toMatchObject({ textTransform });
  });
});
