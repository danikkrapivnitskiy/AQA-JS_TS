import allure from '@wdio/allure-reporter';
import { Status } from 'allure-js-commons';

export function logStep(stepName: string): MethodDecorator {
  return function (_target: unknown, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor?.value;
    descriptor.value = async function (...args: unknown[]) {
      allure.startStep(stepName);
      try {
        const result = await originalMethod.apply(this, args);
        allure.endStep();
        return result;
      } catch (error) {
        allure.endStep(Status.FAILED);
        throw error;
      }
    };
    return descriptor;
  };
}

export function logAction(stepName: string): MethodDecorator {
  return function (_target: unknown, _propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: unknown[]) {
      const selector = args[0]; // Extract the selector from the arguments
      const value = args[1]; // Extract the value from the arguments
      const newStepName = stepName.replace('{selector}', `"${selector}"`).replace('{text}', `"${value}"`);
      allure.startStep(newStepName);
      try {
        const result = await originalMethod.apply(this, args);
        allure.endStep();
        return result;
      } catch (error) {
        allure.endStep(Status.FAILED);
        throw error;
      }
    };
    return descriptor;
  };
}
