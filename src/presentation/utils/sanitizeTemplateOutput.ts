import _ from "lodash";

function clean(el: Record<string, unknown>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function internalClean(el: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return _.transform(el, (result: any, value, key) => {
      const isCollection = _.isObject(value);
      const cleaned = isCollection ? internalClean(value) : value;

      if (isCollection && _.isEmpty(cleaned)) {
        return;
      }

      if (value === "") {
        return;
      }

      _.isArray(result) ? result.push(cleaned) : (result[key] = cleaned);
    });
  }

  return _.isObject(el) ? internalClean(el) : el;
}

function sanitizeTemplateOutput(
  templateFn: _.TemplateExecutor,
  data: Record<string, unknown>
) {
  const result = templateFn(data);
  const parsedTemplate = JSON.parse(result);

  const cleanObject = clean(parsedTemplate);

  return JSON.stringify(cleanObject, null, 2);
}

const curriedSanitizeTemplateOutput = _.curry(sanitizeTemplateOutput, 2);

export { curriedSanitizeTemplateOutput as sanitizeTemplateOutput };
