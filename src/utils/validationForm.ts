interface IValidationFields {
  [key: string]: string;
}

export const validateForm = (validation: IValidationFields, form_values: any) => {
  let object = {};

  Object.keys(validation).forEach(element => {
    const type = validation[element];

    if (type == 'required' && !form_values[element]) {
      object = {
        ...object,
        [element]: 'Campo obrigatório.'
      }
    }

    if (type == 'requiredIfNotId' && !form_values[element] && !form_values['id']) {
      object = {
        ...object,
        [element]: 'Campo obrigatório.'
      }
    }
  });

  if (Object.keys(object).length == 0) {
    return null;
  }

  return object;
}