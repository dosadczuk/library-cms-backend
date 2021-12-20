import * as validator from 'class-validator';
import { UUIDVersion, ValidationOptions as Options } from 'class-validator';

export { IsOptional, ValidateNested } from 'class-validator';

export const IsEmpty = (options?: Options): PropertyDecorator =>
  validator.IsEmpty(i18n('IsEmpty', options));

export const IsNotEmpty = (options?: Options): PropertyDecorator =>
  validator.IsNotEmpty(i18n('IsNotEmpty', options));

export const IsDateString = (options?: Options): PropertyDecorator =>
  validator.IsDateString({}, i18n('IsDateString', options));

export const IsEmail = (options?: Options): PropertyDecorator =>
  validator.IsEmail({}, i18n('IsEmail', options));

export const IsUUID = (version?: UUIDVersion, options?: Options): PropertyDecorator =>
  validator.IsUUID(version, i18n('IsUUID', options));

export const MaxLength = (value: number, options?: Options): PropertyDecorator =>
  validator.MaxLength(value, i18n('MaxLength', options));

export const MinLength = (value: number, options?: Options): PropertyDecorator =>
  validator.MinLength(value, i18n('MinLength', options));

export const IsArray = (options?: Options): PropertyDecorator =>
  validator.IsArray(i18n('IsArray', options));

export const IsBoolean = (options?: Options): PropertyDecorator =>
  validator.IsBoolean(i18n('IsBoolean', options));

export const IsDate = (options?: Options): PropertyDecorator =>
  validator.IsDate(i18n('IsDate', options));

export const IsEnum = (entity: Record<string, unknown>, options?: Options): PropertyDecorator =>
  validator.IsEnum(entity, i18n('IsEnum', options));

export const IsInt = (options?: Options): PropertyDecorator =>
  validator.IsInt(i18n('IsInt', options));

export const IsNumber = (options?: Options): PropertyDecorator =>
  validator.IsNumber({}, i18n('IsNumber', options));

export const IsObject = (options?: Options): PropertyDecorator =>
  validator.IsObject(i18n('IsObject', options));

export const IsString = (options?: Options): PropertyDecorator =>
  validator.IsString(i18n('IsString', options));

export const Min = (value: number, options?: Options): PropertyDecorator =>
  validator.Min(value, i18n('Min', options));

export const Max = (value: number, options?: Options): PropertyDecorator =>
  validator.Max(value, i18n('Max', options));

const i18n = (fn: string, options?: Options): Options => ({
  message({ property, constraints }) {
    return JSON.stringify({
      key: `validation.${fn}`,
      args: { property, ...mapConstraints(constraints) },
    });
  },
  ...options,
});

const mapConstraints = (constraints: any[]): Record<string, unknown> => {
  if (constraints == null) {
    return {};
  }

  const result = {};
  for (const [constraint, idx] of constraints.entries()) {
    result[`constraint${idx}`] = constraint;
  }

  return result;
};
