import styled from "styled-components"

export const Wrapper = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 10px;
`

const SearchText = ({className, children}) => {
    return (
        <div className={className}>{children}</div>
    )
}

export const StyledSearchText = styled(SearchText)`
    margin-left: 10px;
    color: ${props => !props.error ? "red" : ""}
`