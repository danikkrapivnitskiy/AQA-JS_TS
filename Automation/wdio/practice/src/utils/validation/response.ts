import Ajv from 'ajv';
import { expect } from 'chai';
import { IResponse } from '../../data/types/api.types.js';
import { IResponseFields } from '../../data/types/response.types.js';

export function validateSchema<T = object>(response: IResponse<T>, schema: object) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const isValidSchema = validate(response.body);
  expect(isValidSchema).to.be.true;
}

export function validateResponse<T extends object>(
  response: IResponse<T>,
  status: number,
  IsSuccess: boolean,
  ErrorMessage: null | string
) {
  expect(response.status).to.equal(status);
  if (isResponseWithIsSuccessAndErrorMessage(response)) {
    expect(response.body.IsSuccess).to.equal(IsSuccess);
    expect(response.body.ErrorMessage).to.equal(ErrorMessage);
  }
}

function isResponseWithIsSuccessAndErrorMessage(response: IResponse<object>): response is IResponse<IResponseFields> {
  return 'IsSuccess' in response && 'ErrorMessage' in response;
}
