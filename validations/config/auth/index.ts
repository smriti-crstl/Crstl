interface IAuthValidations {
  PASSWORD_VALIDATION: RegExp;
}

const AUTH_VALIDATIONS: IAuthValidations = {
  PASSWORD_VALIDATION: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#-_])[A-Za-z\d@$!%*?&#-_]{8,}$/
};
export { AUTH_VALIDATIONS };
