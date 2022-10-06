import { useState, memo, useCallback } from "react";

import StyledPopup from "../StyledPopup";
import Popup from "../Popup";
import { useGlobalStore } from "../../../globalStore/useGlobalStore";
import * as services from "../../../services"
import { fetchSearchApi } from "../../../utils/common";

import { StyledButton } from "../../Styles"
import { StyledConfirmationHeading, ConfirmationContainer } from "./DeleteStonePopup.style";

// mui
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function DeleteStonePopup({ itemId }) {
  const globalStates = useGlobalStore();
  const { pagination } = globalStates;

  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleSetOpen = useCallback(setOpen, [setOpen]);
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = (id) => {
    setIsDeleting(true)
    setOpen(false);

    const fetchApi = async () => {
      await services.deleteGemstone(id)
      let updatedCurrentPage = pagination.currentPage === pagination.totalPage && pagination.totalItem % pagination.itemPerPage === 1 
          ? pagination.totalPage - 1 
          : pagination.currentPage
      let updatedItemPerPage = pagination.itemPerPage

      await fetchSearchApi(
        updatedCurrentPage, 
        updatedItemPerPage, 
        null, 
        null, 
        globalStates
      )

      setIsDeleting(false)
    
    }
    fetchApi()
  };

  return (
    <div>
      <DeleteOutlineIcon onClick={handleOpen} sx={{"&:hover": {cursor: "pointer"}}}/>

      <StyledPopup open={open} setOpen={handleSetOpen}>
        <ConfirmationContainer>
          <StyledConfirmationHeading
            title={`Are you sure you want to delete "${itemId}" item?`}
          />

          <StyledButton
            title="Yes"
            onClick={() => handleDelete(itemId)}
            disabled={isDeleting}
          />

          <StyledButton
            title="No"
            onClick={handleClose}
          />
        </ConfirmationContainer>
      </StyledPopup>

      {isDeleting && 
        <Popup type="Loading" title="Deleting" /> }
    </div>
  );
}

export default memo(DeleteStonePopup);
