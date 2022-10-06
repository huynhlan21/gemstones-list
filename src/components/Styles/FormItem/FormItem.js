import { useState, memo } from "react";

// mui
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import ClearIcon from "@mui/icons-material/Clear";

function FormItem({
  type = "text",
  width = "100%",
  label,
  value,
  data,
  error = false,
  formerror,
  onUserInput = () => {},
  onBlur = () => {},
  onEnter = () => {},
  clearSearch = () => {},
  helperText = "Incorrect entry.",
  inputText,
  item,
  ...props
}) {
  const [optionValue, setOptionValue] = useState(item ? item.measurement_unit : "");
  const handleChange = (key, value) => {
    setOptionValue(value);
    onUserInput(key, value);
  };

  switch (type) {
    case "option":
      return (
        <div style={{ width }}>
          <FormControl sx={{ m: "7px 0", width: "100%" }} error={error}>
            <InputLabel id="demo-simple-select-helper-label">
              {label}
            </InputLabel>
            <Select
              labelId={
                error
                  ? "demo-simple-select-error-label"
                  : "demo-simple-select-helper-label"
              }
              id={
                error ? "demo-simple-select-error" : "demo-simple-select-helper"
              }
              value={optionValue}
              onChange={(e) => handleChange(value, e.target.value)}
              label={label}
              {...props}
            >
              {data.map((subitem) => (
                <MenuItem key={subitem} value={subitem}>
                  {subitem}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        </div>
      )
    case "search":
      return (
        <div style={{ width }}>
          <OutlinedInput
            sx={{ m: "7px 0", width: "100%" }}
            value={inputText}
            onChange={(e) => onUserInput(value, e.target.value)}
            onKeyDown={e => e.keyCode === 13 ? onEnter() : null}
            endAdornment={inputText.trim() && <ClearIcon 
                            sx={{"&:hover": {cursor: "pointer"}, fontSize: 18}} 
                            onClick={() => {
                              onUserInput(value, "")
                              clearSearch()
                            }} 
                          />}
            {...props}
          />
        </div>
      )
    default:
      return (
        <div style={{ width }}>
          <TextField
            sx={{ m: "7px 0", width: "100%" }}
            id="outlined-search"
            label={label}
            type="text"
            error={error ? true : false}
            onChange={(e) => onUserInput(value, e.target.value)}
            onBlur={(e) => onBlur(value, e.target.value, formerror)}
            helperText={error ? helperText : ""}
            defaultValue={item ? item[value] : ""}
            onKeyDown={e => e.keyCode === 13 ? onEnter() : null}
            {...props}
          />
        </div>
      );
  }
}

export default memo(FormItem);
