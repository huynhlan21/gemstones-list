import namedColors from "color-name-list";

import { formItems } from "../constants";

// get keys of stoneItem & formError
const initialKeys = formItems
  // eslint-disable-next-line 
  .map((item) => {
    if (
      (item.value !== "action" && item.required) ||
      (item.value !== "action" && item?.type?.length > 0)
    ) {
      return item.value;
    }
  })
  .filter((item) => item !== undefined);

// get keys of fields that are dependent to each other
const dependentFieldKeys = formItems
  // eslint-disable-next-line 
  .map((item) => {
    if (item.required === "dependent") {
      return item.value;
    }
  })
  .filter((item) => item !== undefined);

export const validate = (values) => {
    const error = {}

    initialKeys.forEach((key) => {
      formItems.forEach((item) => {
        if (item.value === key) {
          //required fields should be fulfilled
          if (item.required && !values[key]?.toString().trim()) {
            error[key] = true;
          }

          // the name is required and should not contain any special characters
          if (item.regex?.test(values[key])) {
            error[key] = true;
          }

          // the color is required and should be a real color name without spacing
          if (
            item.value === "color" &&
            !namedColors.find(color => color.name.toLowerCase() === values[key]?.trim().toLowerCase())
          ) {
            error[key] = true;
          }

          // average value should be a number and greater than 0
          if (item.type === "number") {
            if (values[key] === "" || values[key] == null) {
              error[key] = false;
            } else if ((values[key] * 1) / values[key] !== 1 || (values[key] * 1 ) < 0) {
              error[key] = true;
            }
          }

          // fields that are dependent to each other should be both blank or fulfilled
          if (item.required === "dependent") {
            let numberOfFulfilled = 0
            dependentFieldKeys.forEach(key => {
              if (values[key]) {
                numberOfFulfilled++
              }
            })
            
            if (numberOfFulfilled > 0 && numberOfFulfilled < dependentFieldKeys.length) {
              // eslint-disable-next-line 
              dependentFieldKeys.map(key => {
                if(values[key] === undefined || values[key] === "") {
                  return key
                }
              })
              .filter(key => key !== undefined)
              .forEach(key => {
                error[key] = true
              })
            } else if (
              dependentFieldKeys.every(
                (key) => values[key] === undefined || values[key] === ""
              )
            ) {
              error[key] = false;
            } 
          }

        }
      });
    });

    return error
};

export const validateIndividualItem = (key, value, formError) => {
    const error = { ...formError };

    initialKeys.forEach((keyOfItem) => {
      if (key === keyOfItem) {
        formItems.forEach((item) => {
          if (item.value === key) {
            //required fields should be fulfilled
            if (item.required && !value.toString().trim()) {
              error[key] = true;
            } else if (item.required && !!value) {
              error[key] = false;
            }

            // the name is required and should not contain any special characters
            if (item.regex && item.regex?.test(value)) {
              error[key] = true;
            } else if (item.regex && !item.regex?.test(value) && !!value) {
              error[key] = false;
            }

            // the color is required and should be a real color name without spacing
            if (
              item.value === "color" &&
              !namedColors.find(color => color.name.toLowerCase() === value.toLowerCase())
            ) {
              error[key] = true;
            } else if (
              item.value === "color" &&
              namedColors.find(color => color.name.toLowerCase() === value.toLowerCase())
            ) {
              error[key] = false;
            }

            // average value should be a number and greater than 0
            if (
              (item.type === "number" && value === "") ||
              (item.type === "number" && value === undefined)
            ) {
              error[key] = false;
            } else if (
              (item.type === "number" && (value * 1) / value !== 1 ) ||
              (item.type === "number" && ((value * 1 ) < 0))
            ) {
              error[key] = true;
            }
          }
        });
      }
    });

    return error
}