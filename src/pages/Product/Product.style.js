import styled from "styled-components"

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px;
`

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const InfoTitle = styled.h3`
    font-size: 17px;
    font-weight: normal;
    color: var(--primary);
    margin: 20px 0 8px;
`

export const InfoDetail = styled.div`
    font-size: 14px;
`

export const InfoSubTitle = styled.span`
    font-weight: bold;
`