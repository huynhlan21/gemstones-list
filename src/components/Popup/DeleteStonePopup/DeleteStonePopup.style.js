import styled from "styled-components"

export const ConfirmationContainer = styled.div`
  text-align: center;
`
const ConfirmationHeading = ({className, title}) => (
  <h3 className={className}>{title}</h3>
)

export const StyledConfirmationHeading = styled(ConfirmationHeading)`
  margin-bottom: 20px;
  font-weight: normal;
`