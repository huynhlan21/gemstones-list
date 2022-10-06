import styled from "styled-components"
import { Link } from "react-router-dom"

export const Wrapper = styled(Link)`
  padding: 10px;
  border: 1px solid #ccc;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  cursor: pointer;

  &:hover {
    border-color: var(--primary);
  }
`

const InfoTitle = styled.h3`
    font-size: 17px;
    font-weight: normal;
    color: var(--primary);
    margin-bottom: 5px;
`

const InfoDetail = styled.div`
    font-size: 14px;
`

const InfoSubTitle = styled.span`
    font-weight: bold;
`

const InfoComp = ({ className, title, price, stones }) => {
    return (
        <div className={className}>
            <InfoTitle>{title}</InfoTitle>
            <InfoDetail>
                <InfoSubTitle>Price: </InfoSubTitle>
                {`${price} USD`}
            </InfoDetail>
            <InfoDetail>
                <InfoSubTitle>Gemstones: </InfoSubTitle>
                {stones.map((stone, index) => (
                    index > 0 ? <span key={index}>{`, ${stone}`}</span> : <span key={index}>{stone}</span>
                ))}
            </InfoDetail>
        </div>
    )
}

export const Info = styled(InfoComp)`
    padding: 8px;
`