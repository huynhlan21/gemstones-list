import { useCallback, memo, useEffect, useState } from "react";

import { formItems } from "../../../utils/constants";
import { useGlobalStore } from "../../../globalStore/useGlobalStore";
import * as services from "../../../services";
import { validate, validateIndividualItem } from "../../../utils/common"
import { fetchSearchApi } from "../../../utils/common";
import Popup from "../Popup";

// styles
import StyledPopup from "../StyledPopup";
import { StyledButton, StyledHeading, FormItem } from "../../Styles"
import { FormActions } from "./EditStonePopup.style"

// get keys of fields that are dependent to each other
const dependentFieldKeys = formItems
  // eslint-disable-next-line 
  .map((item) => {
    if (item.required === "dependent") {
      return item.value;
    }
  })
  .filter((item) => item !== undefined);

function EditStonePopup({ openEdit = false, itemId, closeEditting }) {
  const globalStates = useGlobalStore();
  const { gemstones, pagination, searchText } = globalStates;
  const currentGemstone = gemstones.find(gemstone => gemstone.id === itemId)

  const [stoneItem, setStoneItem] = useState(currentGemstone ? currentGemstone : {});
  const [formError, setFormError] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCloseEditting = useCallback(() => {
    closeEditting()
    setFormError({})
  }, [closeEditting])

  // action occurs when clicking "ADD" btn
  const handleUpdate = () => {
    setFormError(validate(stoneItem));
    
    if (isFormValid) {
      setIsEditing(true)
      closeEditting()

      const fetchApi = async () => {
        let updatedId = undefined
        const currentGemstone = gemstones.find(stone => stone.id === stoneItem.id)
        if(currentGemstone.name.slice(0, 3).toLowerCase() !== stoneItem.name.slice(0, 3).toLowerCase()) {
          updatedId = `${currentGemstone.id.slice(0, 8)}${stoneItem.name.slice(0, 3).padStart(3, "0").toUpperCase()}`
        }

        await services.updateGemstone(stoneItem.id, {...stoneItem, updatedId: updatedId})
        let updatedCurrentPage = pagination.currentPage
        
        if (pagination.currentPage === pagination.totalPage && !stoneItem.name.includes(searchText)) {
          updatedCurrentPage = (pagination.totalItem % pagination.itemPerPage === 1) ? pagination.totalPage - 1 : pagination.totalPage
        }
        await fetchSearchApi(
          updatedCurrentPage, 
          pagination.itemPerPageOption.includes(pagination.itemPerPage) ? pagination.itemPerPage : pagination.itemPerPageOption[0], 
          null, 
          null, 
          globalStates
        )
        setIsFormValid(false)
        setIsEditing(false)
      }
      fetchApi()
      
    }

  };

  // set value for new item & validate on input
  const handleChange = useCallback(
    (key, value) => {
      setStoneItem({ ...stoneItem, [key]: value.trim() });
      setFormError(validateIndividualItem(key, value, formError))
    },
    [formError, stoneItem]
  );

  useEffect(() => {
    if(!!currentGemstone) {
      setStoneItem(currentGemstone)
    }
  }, [currentGemstone])

  const setValidateIndividualItem = useCallback((key, value, formError) => {
    setFormError(validateIndividualItem(key, value, formError))
  }, [])

  // update isFormValid when formError changed
  useEffect(() => {
    let numberOfFulfilled = 0
    dependentFieldKeys.forEach(key => {
      if (stoneItem[key]) {
        numberOfFulfilled++
      }
    })
    
    let valid = true;
    
    if (numberOfFulfilled > 0 && numberOfFulfilled < dependentFieldKeys.length) {
      valid = false
    }

    Object.keys(formError).forEach((key) => {
      if(!!formError[key]) {
        valid = false
      }
    }) 

    setIsFormValid(valid);
  }, [formError, stoneItem]);

  return (
  <>
    <StyledPopup open={openEdit} setOpen={closeEditting}>
      <form>
        <StyledHeading type="sub-heading" title={`Edit ${currentGemstone?.id} item`} textalign="center"/>
        {formItems.map((item, index) => {
          if (item.value === "id" || item.value === "action") return "";
          else if (item.data) {
            return (
              <FormItem
                key={index}
                type="option"
                label={item.name}
                value={item.value}
                data={item.data}
                helperText={item?.errorMessage}
                onUserInput={handleChange}
                onBlur={setValidateIndividualItem}
                error={formError[item.value]}
                formerror={formError}
                item={currentGemstone}
              />
            );
          } else
            return (
              <FormItem
                key={index}
                label={item.name}
                value={item.value}
                helperText={item.errorMessage}
                onUserInput={handleChange}
                onBlur={setValidateIndividualItem}
                error={formError[item.value]}
                formerror={formError}
                item={currentGemstone}
              />
            );
        })}

        <FormActions>
          <StyledButton
            onClick={handleUpdate}
            title="UPDATE"
            disabled={isEditing}
          />

          <StyledButton
            title="CANCEL"
            onClick={handleCloseEditting}
          />
        </FormActions>
      </form>
    </StyledPopup>

    {isEditing && 
        <Popup type="Loading" title="Updating" /> }
  </>
  );
}

export default memo(EditStonePopup);
