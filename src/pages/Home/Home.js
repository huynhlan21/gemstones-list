import { memo, useCallback, useEffect, useState, useRef } from "react";
import namedColors from "color-name-list";

import Popup from "../../components/Popup";
import Search from "../../components/Search"
import StyledPagination from "../../components/Pagination";
import { formItems } from "../../utils/constants";
import { fetchSearchApi } from "../../utils/common";
import { useGlobalStore } from "../../globalStore/useGlobalStore";
import { routes } from "../../utils/config"

import { StyledHeading, Navbar } from "../../components/Styles"
import { Wrapper, ColorBox, StyledTableCell, StyledTableRow, TableHeadContent, SortingIcon, Box } from "./Home.style"

// mui
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Home() {
  const globalStates = useGlobalStore();
  const { gemstones, pagination, searchText, sorting, setSorting, isLoading } = globalStates;

  const tableRef = useRef()

  const [isEditting, setIsEditting ] = useState(false)
  const handleOpenEditting = () => {setIsEditting(true)}
  const handleCloseEditting = useCallback(() => {setIsEditting(false)}, [])

  const [ edittingId, setEdittingId ] = useState("")

  const handleEditItem = (id) => {
    handleOpenEditting()
    setEdittingId(id);
  }

  const handleSorting = (item) => {
    setSorting(prev => {
      return {
        [item]: prev[item] === "increase" ? "decrease" : "increase"
      }
    })
  }

  // refresh data and when sorting & searchText change
  useEffect(()=> {
    fetchSearchApi(1, null, null, null, globalStates)
    // eslint-disable-next-line 
  }, [sorting, searchText])

  // scroll table to top when pagination, sorting & searchText change
  useEffect(() => {
    tableRef.current.scrollTo(0,0)
  }, [pagination, sorting, searchText])

  return (
    <Wrapper>
      {/* header */}
      <Box>
        <StyledHeading title="Gemstone" />
        <Navbar items={[{name: "Home", to: routes.home}, {name: "Products", to: routes.products}]}/>
      </Box>

      {/* search area */}
      <Search />

      {/* main table   */}
      <TableContainer sx={{marginBottom: "25px", maxHeight: 580}} component={Paper} ref={tableRef}>
        <Table sx={{ minWidth: 700 }} aria-label="sticky table" stickyHeader >
          <TableHead>
            <TableRow>
              {/* No. colum */}
              <StyledTableCell
                align="center"
                sx={{ fontSize: 16 }}
              >
                No.
              </StyledTableCell>

              {/* Main columns */}
              {formItems.map((item, index) => (
                item.value !== "action" && <StyledTableCell
                key={index}
                align="center"
                sx={{ fontSize: 16, "&:hover": {cursor: "pointer"} }}
                onClick={() =>  handleSorting(item.value)}
                >
                  <TableHeadContent>
                    {<SortingIcon type={sorting[item.value]} />}
                    {item.name}
                  </TableHeadContent>
                </StyledTableCell>
              ))}

              {/* Action column */}
              <StyledTableCell
                align="center"
                sx={{ fontSize: 16 }}
              >
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{maxHeight: 750, overflow: "scroll"}}>
            {gemstones.map((gemstone, index) => {
              return (
                <StyledTableRow key={gemstone.id}>
                  {/* no. */}
                  <StyledTableCell align="center" sx={{width: "5%"}}>
                    {pagination.itemPerPage * (pagination.currentPage  - 1) + 1 + index}
                  </StyledTableCell>

                  {/* id */}
                  <StyledTableCell align="center" sx={{width: "10%"}}>
                    {gemstone.updatedId ? gemstone.updatedId : gemstone.id}
                  </StyledTableCell>

                  {/* name */}
                  <StyledTableCell 
                    align="center"
                    onClick={() => handleEditItem(gemstone.id)}
                    sx={{width: "30%", "&:hover": {cursor: "pointer", color: "var(--primary)"}}}
                  >
                    {gemstone.name}
                  </StyledTableCell>

                  {/* color */}
                  <StyledTableCell align="center" sx={{width: "10%"}}>
                    {gemstone.color}
                    <ColorBox
                      backgroundColor={namedColors.find(color => color.name.toLowerCase() === gemstone.color.trim().toLowerCase()).hex }
                    />
                  </StyledTableCell>

                  {/* location */}
                  <StyledTableCell align="center" sx={{width: "20%"}}>
                    {gemstone.found_at}
                  </StyledTableCell>

                  {/* average_value */}
                  <StyledTableCell align="center" sx={{width: "10%"}}>
                    {!!gemstone.average_value && gemstone.average_value*1}
                  </StyledTableCell>

                  {/* measurement_unit */}
                  <StyledTableCell align="center" sx={{width: "10%"}}>
                    {gemstone.measurement_unit}
                  </StyledTableCell>

                  {/* delete icon */}
                  <StyledTableCell 
                    align="center"
                    sx={{ color: "#333", width: "5%", "&:hover": {cursor: "pointer", color: "var(--primary)"}}}
                  >
                    <Popup type="DeleteStone" itemId={gemstone.id} />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Footer */}
      <Box>
        {pagination.totalPage > 0 && <StyledPagination />}
        <Popup type="AddStone" />
      </Box>
      
      {/* edit popup */}
      <Popup type="EditStone" openEdit={isEditting} itemId={edittingId} closeEditting={handleCloseEditting}/>

      {/* loading popup */}
      {isLoading && 
        <Popup type="Loading" /> }

    </Wrapper>
  );
}

export default memo(Home);
