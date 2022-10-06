import styled from "styled-components"
import { Heading } from "./Heading"

export const StyledHeading = styled(Heading)`
    color: var(--primary);
    margin-bottom: ${(props) => props.type === "sub-heading" ? "5px" : "10px"};
    font-size: ${(props) => props.type === "sub-heading" ? "32px" : "45px"};
    text-align: ${(props) => props.textalign};
`