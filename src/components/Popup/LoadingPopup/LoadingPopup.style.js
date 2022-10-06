import styled, { keyframes } from "styled-components"

export const LoadingContainer = styled.div`
  text-align: center;
`

const LoadingMessage = ({className, title}) => (
  <h3 className={className}>{title}</h3>
)

export const StyledLoadingMessage = styled(LoadingMessage)`
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 30px;
    color: var(--primary);
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 1s linear infinite;
  font-size: 1.8rem;
  color: #333;
`;