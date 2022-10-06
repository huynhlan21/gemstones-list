import { memo } from "react";

import { useGlobalStore } from "../../globalStore/useGlobalStore";
import { fetchSearchApi } from "../../utils/common";

// mui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function StyledPagination() {
  const globalStates = useGlobalStore();
  const { pagination} = globalStates;
  const { currentPage, totalPage, itemPerPage, totalItem, itemPerPageOption } = pagination

  const handleChangeItemsPerPage = (event) => {
    fetchSearchApi(1, event.target.value, null, null, globalStates)
  };

  const handleChangePageNumber = (event, value) => {
    fetchSearchApi(value, null, null, null, globalStates)
  };

  return (
    <Stack spacing={2} sx={{display: "flex", justifyContent: "flex-start", alignItem: "center", flexDirection: "row"}}>
      <FormControl sx={{minWidth: 130, marginRight: 5}}>
        <InputLabel id="demo-simple-select-label">Items per page</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={itemPerPage ? itemPerPage : itemPerPageOption[0]}
          label="Items per page"
          onChange={handleChangeItemsPerPage}
        >
          {pagination.itemPerPageOption?.map(option => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
          <MenuItem value={totalItem}>All</MenuItem>
        </Select>
      </FormControl>

      <Pagination 
        sx={{display: "flex", justifyContent: "center", width: "200"}}
        color="primary"
        size="large"
        showFirstButton
        showLastButton
        count={totalPage ? totalPage : 1}
        page={currentPage ? currentPage : 1}
        onChange={handleChangePageNumber}
      />
    </Stack>
  );
}

export default memo(StyledPagination)