import { useCallback, memo, useEffect, useState } from "react";

import { useGlobalStore } from "../../../globalStore/useGlobalStore";
import StyledPopup from "../StyledPopup";
import { StyledButton, StyledHeading, FormItem } from "../../Styles"
import { FormActions } from "./AddStonePopup.style"
import * as services from "../../../services"
import { validate, validateIndividualItem } from "../../../utils/common"
import { formItems } from "../../../utils/constants";
import Popup from "../Popup";

// get keys of fields that are dependent to each other
const dependentFieldKeys = formItems
  // eslint-disable-next-line 
  .map((item) => {
    if (item.required === "dependent") {
      return item.value;
    }
  })
  .filter((item) => item !== undefined);

function AddStonePopup() {
  const { setGemstones, pagination, setPagination, setSearchText } = useGlobalStore();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setFormError({});
    setStoneItem({});
    setIsFormValid(false)
  };
  const handleClose = () => setOpen(false);
  const handleSetOpen = useCallback(setOpen, [setOpen]);

  const [stoneItem, setStoneItem] = useState({});
  const [formError, setFormError] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // action occurs when clicking "ADD" btn
  const handleAdd = (data) => {
    setFormError(validate(stoneItem));
    
    if (isFormValid) {
      handleClose()
      setIsAdding(true)
      const createNewItem = async () => {
        const result = await services.getAllGemstones()
        const itemOrder = (
          Number(result[result.length - 1].id.slice(4,7)) + 1
        )
          .toString()
          .padStart(3, 0);

        const itemId = `LAN-${itemOrder}-${data.name
          ?.slice(0, 3)
          .padStart(3, "0")
          .toUpperCase()}`;

        handleCreateNewItem({
          id: itemId,
          average_value: "",
          measurement_unit: "",
          ...data
        });
        
        setIsFormValid(false)
        setStoneItem({});
        setIsAdding(false)
      }
      
      createNewItem()
    }

  };

  // add new item to gemstone list
  const handleCreateNewItem = (data) => {
    services.addNewGemstone(data)

    setSearchText("")

    const fetchApi = async () => {
      const lastPage = pagination.totalItem % pagination.itemPerPage === 0 ? 
      pagination.totalPage + 1 : pagination.totalPage

      const {data, totalPage, totalItem, currentPage, itemPerPage, itemPerPageOption} = await services.loadingGemstoneList(
        lastPage,
        pagination.itemPerPageOption.includes(pagination.itemPerPage) ? pagination.itemPerPage : pagination.itemPerPageOption[0]
      )

      setGemstones(data)
      setPagination(prev => ({
        ...prev,
        totalPage,
        currentPage,
        totalItem,
        itemPerPage,
        itemPerPageOption
      }))
    }
    fetchApi()

  };

  // set value for new item & validate on input
  const handleChange = useCallback(
    (key, value) => {
      setStoneItem({ ...stoneItem, [key]: value.trim() });
      setFormError({ ...formError, [key]: false });
      setFormError(validateIndividualItem(key, value, formError))
    },
    [formError, stoneItem]
  );

  const setValidateIndividualItem = useCallback((key, value, formError) => {
    setFormError(validateIndividualItem(key, value, formError))
  }, [])

  // update isFormValid when formError changed
  useEffect(() => {
    // eslint-disable-next-line 
    const requiredFieldKeys = formItems.map(item => {
      if (item.required === true) {
        return item.value
      }
    })
    .filter(key => key !== undefined)
    
    if(requiredFieldKeys.some(key => !stoneItem[key])) {
      return
    }

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
      <StyledButton
        onClick={handleOpen}
        title="ADD NEW ITEM"
        size="large"
      />

      <StyledPopup open={open} setOpen={handleSetOpen}>
        <form>
          <StyledHeading type="sub-heading" title="Add a new item" textalign="center"/>
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
                />
              );
          })}

          <FormActions>
            <StyledButton
              title="ADD"
              onClick={() => handleAdd(stoneItem)}
              disabled={isAdding}
            />
              
            <StyledButton
              title="CANCEL"
              onClick={handleClose}
            />
          </FormActions>
        </form>
      </StyledPopup>

      {isAdding && 
        <Popup type="Loading" title="Adding" /> }
    </>
  );
}

export default memo(AddStonePopup);
