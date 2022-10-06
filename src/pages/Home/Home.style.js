import styled from "styled-components"

import { styled as muiStyled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SortIcon from "@mui/icons-material/Sort";

// mui - style component for table cell
export const StyledTableCell = muiStyled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      alignItem: "center"
    },
    [`&.${tableCellClasses.body}`]: {
      maxWidth: 300,
      fontSize: 14,
      whiteSpace: "wrap",
      breakWord: "wrap",
      wordWrap: "break-word"
    }
}))

// mui - style component for table row
export const StyledTableRow = muiStyled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0
    }
}));

export const Wrapper = styled.div`
    padding: 20px 50px;
`

export const TableHeadContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ColorBox = styled.div`
    display: inline-block;
    height: 15px;
    width: 15px;
    margin: 0 5px -3px;
    background-color: ${props => props.backgroundColor};
`

const SortingIconElement = ({className, type, ...props}) => {
    let icon

    switch(type) {
      case "increase":
        icon = <ArrowUpwardIcon {...props}/>
        break
      case "decrease":
        icon = <ArrowDownwardIcon {...props}/>
        break
      default:
        icon = <SortIcon sx={{fontSize: 11}} />
    }

    return (
      <div className={className}>
        {icon}
      </div>
    )
}

export const SortingIcon = styled(SortingIconElement)`
    min-width: 25px;
    min-height: 35px;
    margin-right: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {cursor: pointer}
`

export const Box = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`