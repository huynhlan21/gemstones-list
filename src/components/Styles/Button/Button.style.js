import styled from "styled-components"
import { MuiButton } from "./Button"

export const StyledButton = styled(MuiButton)`
    font-size: 17px;

    & + button {
        margin-left: 15px;
    }
`