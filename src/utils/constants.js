export const gemstoneList = [
  {
    id: "LAN-001-RUB",
    name: "Ruby",
    color: "red",
    found_place: "Viet Nam",
    average_value: 2,
    measurement_unit: "mm"
  }
];

export const formItems = [
  {
    value: "id",
    name: "ID"
  },
  {
    value: "name",
    name: "Name",
    required: true,
    errorMessage:
      "The name is required and should not contain any special characters",
    regex: /[`!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?~]/
  },
  {
    value: "color",
    name: "Color",
    required: true,
    errorMessage:
    "The color is required and should be a real color name without spacing"
  },
  {
    value: "found_at",
    name: "Found At",
    required: true,
    errorMessage: "The found place is required"
  },
  {
    value: "average_value",
    name: "Average Value",
    required: "dependent",
    requiredDep: "value-unit",
    errorMessage: "Should be a number and greater than 0",
    type: "number",
    regex: /[+]/
  },
  {
    value: "measurement_unit",
    name: "Unit",
    required: "dependent",
    requiredDep: "value-unit",
    data: ["kg", "g", "mg", "cm", "mm"],
    errorMessage:
      "Average Value & Unit should be both blank or fulfilled"
  },
  {
    value: "action",
    name: "Action"
  }
];
