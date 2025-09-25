import FilterFieldInputString from "./inputs/filter-field-input-string";
import FilterFieldInputObject from "./inputs/filter-field-input-object";
import FilterFieldInputDatetime from "./inputs/filter-field-input-datetime";
import FilterFieldInputNumber from "./inputs/filter-field-input-number";
import FilterFieldInputPrice from "./inputs/filter-field-input-price";
import FilterFieldInputBoolean from "./inputs/filter-field-input-boolean";
import FilterFieldInputDate from "./inputs/filter-field-input-date";
import FilterFieldInputShippingDate from "./inputs/filter-field-input-shipping-date";
import FilterFieldSelectDeviceType from "./inputs/filter-field-select-device-type";
import FilterFieldInputDcPowerWp from "./inputs/filter-field-input-dc-power-wp";
import FilterFieldSelectInverterManufacturer from "./inputs/filter-field-select-inverter-manufacturer";
import FilterFieldSelectStructureType from "./inputs/filter-field-select-structure-type";
import FilterFieldSelectStructureName from "./inputs/filter-field-select-structure-name";
import FilterFieldSelectModuleName from "./inputs/filter-field-select-module-name";
import FilterFieldSelectAcVoltage from "./inputs/filter-field-select-ac-voltage";
import FilterFieldSelectDeviceTypeProduct from "./inputs/filter-field-select-device-type-product";
import FilterFieldSelectAccessLevel from "./inputs/filter-field-select-access-level";
import FilterFieldInputCnpj from "./inputs/filter-field-input-cnpj";
import FilterFieldInputInteger from "./inputs/filter-field-input-integer";

export default function FilterFieldInput({
  field,
  setField,
  parentField,
  setFieldOnParent,
}: any) {
  function handleSetValue(value: any) {
    //setField({ ...field, value: event.target.value });
    if (parentField) {
      setFieldOnParent({ ...field, value, filter: { containsi: value } });
    } else {
      setField({ ...field, value, filter: { containsi: value } });
    }
  }

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
      {!field.hideFilter && !field.hide && (
        <>
          {field.type == "cnpj" && (
            <FilterFieldInputCnpj
              field={field}
              setField={handleSetField}
            ></FilterFieldInputCnpj>
          )}
          {field.type == "string" && (
            <FilterFieldInputString
              field={field}
              setField={handleSetField}
            ></FilterFieldInputString>
          )}
          {field.type == "datetime" && (
            <FilterFieldInputDatetime
              field={field}
              setField={handleSetField}
            ></FilterFieldInputDatetime>
          )}
          {field.type == "boolean" && (
            <FilterFieldInputBoolean
              field={field}
              setField={handleSetField}
            ></FilterFieldInputBoolean>
          )}
          {field.type == "deviceType" && (
            <FilterFieldSelectDeviceType
              field={field}
              setField={handleSetField}
            ></FilterFieldSelectDeviceType>
          )}
          {field.type == "deviceTypeProduct" && (
            <FilterFieldSelectDeviceTypeProduct
              field={field}
              setField={handleSetField}
            ></FilterFieldSelectDeviceTypeProduct>
          )}

          {field.type == "accessLevel" && (
            <FilterFieldSelectAccessLevel
              field={field}
              setField={handleSetField}
            ></FilterFieldSelectAccessLevel>
          )}
          {field.type == "inverterManufacturer" && (
            <FilterFieldSelectInverterManufacturer
              field={field}
              setField={handleSetField}
            ></FilterFieldSelectInverterManufacturer>
          )}
          {field.type == "acVoltage" && (
            <FilterFieldSelectAcVoltage
              field={field}
              setField={handleSetField}
            ></FilterFieldSelectAcVoltage>
          )}
          {/* {field.type == "moduleManufacturer" && (
            <FilterFieldSelectModuleManufacturer
              field={field}
              setField={handleSetField}
            ></FilterFieldSelectModuleManufacturer>
          )} */}

          {field.type == "moduleName" && (
            <FilterFieldSelectModuleName
              field={field}
              setField={handleSetField}
            ></FilterFieldSelectModuleName>
          )}
          {field.type == "structureType" && (
            <FilterFieldSelectStructureType
              field={field}
              setField={handleSetField}
            ></FilterFieldSelectStructureType>
          )}
          {field.type == "structureName" && (
            <FilterFieldSelectStructureName
              field={field}
              setField={handleSetField}
            ></FilterFieldSelectStructureName>
          )}
          {field.type == "date" && (
            <FilterFieldInputDate
              field={field}
              setField={handleSetField}
            ></FilterFieldInputDate>
          )}
          {field.type == "shippingDate" && (
            <FilterFieldInputShippingDate
              field={field}
              setField={handleSetField}
            ></FilterFieldInputShippingDate>
          )}
          {field.type == "number" && (
            <FilterFieldInputNumber
              field={field}
              setField={handleSetField}
            ></FilterFieldInputNumber>
          )}
          {field.type == "integer" && (
            <FilterFieldInputInteger
              field={field}
              setField={handleSetField}
            ></FilterFieldInputInteger>
          )}
          {field.type == "price" && (
            <FilterFieldInputPrice
              field={field}
              setField={handleSetField}
            ></FilterFieldInputPrice>
          )}
          {field.type == "dcPowerWp" && (
            <FilterFieldInputDcPowerWp
              field={field}
              setField={handleSetField}
            ></FilterFieldInputDcPowerWp>
          )}

          {field?.type == "object" && (
            <FilterFieldInputObject
              field={field}
              setField={handleSetField}
            ></FilterFieldInputObject>
          )}
          {field.type == "object-exploded" &&
            field.fields &&
            field.fields.map((subfield: any) => (
              <FilterFieldInput
                key={subfield.name}
                field={subfield}
                setFieldOnParent={handleSetSubfield}
                parentField={field}
              ></FilterFieldInput>
            ))}
        </>
      )}
    </>
  );
}
