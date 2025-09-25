import FieldInputString from "./inputs/field-input-string";
import FieldInputObject from "./inputs/field-input-object";
import FieldInputCnpj from "./inputs/field-input-cnpj";
import FieldInputIe from "./inputs/field-input-ie";
import FieldInputCpf from "./inputs/field-input-cpf";
import FieldSelectTypeContact from "./inputs/field-select-type-contact";
import FieldInputPrice from "./inputs/field-input-price";
import FieldSelectDeviceType from "./inputs/field-select-device-type";
import FieldInputShippingDate from "./inputs/field-input-shipping-date";
import FieldInputImage from "./inputs/field-input-image";
import FieldInputBoolean from "./inputs/field-input-boolean";
import FieldInputNumber from "./inputs/field-input-number";
import FieldInputCep from "./inputs/field-input-cep";
import FieldSelectVariableType from "./inputs/field-select-variable-type";
import colSpanFromSize from "@/utils/colSpanFromSize";
import FieldSelectCalcMethod from "./inputs/field-select-calc-method";
import FieldSelectAccessLevel from "./inputs/field-select-access-level";
import FieldInputInteger from "./inputs/field-input-integer";
import FieldSelectInverterType from "./inputs/field-select-inverter-type";
import FieldMppts from "./inputs/field-mppts";
import FieldInputPercentage from "./inputs/field-input-percentage";

export default function FormFieldInput({
  field,
  setField,
  parentField,
  setFieldOnParent,
  disabled,
  value,
}: any) {
  function handleSetField(field: any) {
    //
    if (parentField) {
      setFieldOnParent({ ...field });
    } else {
      setField({ ...field });
    }
  }

  function handleSetSubfield(subfield: any) {
    if (field.fields && setField) {
      console.log("setField");
      setField({
        ...field,
        fields: field.fields.map((el: any) => {
          if (el.name == subfield.name) return subfield;
          else return el;
        }),
      });
    }

    if (field.fields && setFieldOnParent) {
      setFieldOnParent({
        ...field,
        fields: field.fields.map((el: any) => {
          if (el.name == subfield.name) return subfield;
          else return el;
        }),
      });
    }
  }

  return (
    <>
      {!field.hideForm && !field.hide && (
        <>
          {!field.type?.includes("object") && (
            <div
              className={colSpanFromSize(field?.size ? field.size : undefined)}
            >
              {field.type == "string" && (
                <FieldInputString
                  label={`${
                    parentField?.label ? parentField?.label + " - " : ""
                  }  ${field.label}`}
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldInputString>
              )}

              {field.type == "password" && (
                <FieldInputString
                  label={`${
                    parentField?.label ? parentField?.label + " - " : ""
                  }  ${field.label}`}
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldInputString>
              )}
              {field.type == "cep" && (
                <FieldInputCep
                  label={`${
                    parentField?.label ? parentField?.label + " - " : ""
                  }  ${field.label}`}
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldInputCep>
              )}

              {field.type == "cnpj" && (
                <FieldInputCnpj
                  label={`${
                    parentField?.label ? parentField?.label + " - " : ""
                  }  ${field.label}`}
                  field={field}
                  value={value}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldInputCnpj>
              )}

              {field.type == "cpf" && (
                <FieldInputCpf
                  label={`${
                    parentField?.label ? parentField?.label + " - " : ""
                  }  ${field.label}`}
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                  value={value}
                ></FieldInputCpf>
              )}

              {field.type == "ie" && (
                <FieldInputIe
                  label={`${
                    parentField?.label ? parentField?.label + " - " : ""
                  }  ${field.label}`}
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldInputIe>
              )}

              {field.type == "contactType" && (
                <FieldSelectTypeContact
                  label={`${
                    parentField?.label ? parentField?.label + " - " : ""
                  }  ${field.label}`}
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldSelectTypeContact>
              )}

              {field.type == "deviceType" && (
                <FieldSelectDeviceType
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldSelectDeviceType>
              )}

              {field.type == "inverterType" && (
                <FieldSelectInverterType
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldSelectInverterType>
              )}

              {field.type == "accessLevel" && (
                <FieldSelectAccessLevel
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldSelectAccessLevel>
              )}

              {field.type == "variableType" && (
                <FieldSelectVariableType
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldSelectVariableType>
              )}

              {field.type == "calcMethod" && (
                <FieldSelectCalcMethod
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldSelectCalcMethod>
              )}

              {field.type == "price" && (
                <FieldInputPrice
                  label={`${
                    parentField?.label ? parentField?.label + " - " : ""
                  }  ${field.label}`}
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldInputPrice>
              )}
              {field.type == "number" && (
                <FieldInputNumber
                  label={`${
                    parentField?.label ? parentField?.label + " - " : ""
                  }  ${field.label}`}
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldInputNumber>
              )}

              {field.type == "percentage" && (
                <FieldInputPercentage
                  label={`${
                    parentField?.label ? parentField?.label + " - " : ""
                  }  ${field.label}`}
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldInputPercentage>
              )}

              {field.type == "integer" && (
                <FieldInputInteger
                  label={`${
                    parentField?.label ? parentField?.label + " - " : ""
                  }  ${field.label}`}
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldInputInteger>
              )}

              {field.type == "boolean" && (
                <FieldInputBoolean
                  label={`${
                    parentField?.label ? parentField?.label + " - " : ""
                  }  ${field.label}`}
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldInputBoolean>
              )}

              {field.type == "shippingDate" && (
                <FieldInputShippingDate
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldInputShippingDate>
              )}

              {field.type == "mppts" && (
                <FieldMppts
                  field={field}
                  setField={handleSetField}
                  disabled={disabled}
                ></FieldMppts>
              )}
            </div>
          )}

          {field.type == "object-image" && (
            <div className={colSpanFromSize(field.size)}>
              <FieldInputImage
                field={field}
                setField={handleSetField}
                disabled={disabled}
              ></FieldInputImage>
            </div>
          )}

          {field.type == "object" && (
            <div className={colSpanFromSize(field.size)}>
              <FieldInputObject
                field={field}
                setField={handleSetField}
                disabled={disabled}
              ></FieldInputObject>
            </div>
          )}

          {field.type == "object-exploded" &&
            field.fields &&
            field.fields.map((subfield: any) => (
              <FormFieldInput
                key={subfield.name}
                field={subfield}
                setFieldOnParent={handleSetSubfield}
                parentField={field}
                disabled={disabled}
              ></FormFieldInput>
            ))}
        </>
      )}
    </>
  );
}
