import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { Wrapper, Container, InfoContainer, InfoTitle, InfoDetail, InfoSubTitle } from "./Product.style"
import * as services from "../../services"

function Product () {
    const [product, setProduct] = useState({})

    const location = useLocation()
    
    useEffect(() => {
        const fetchApi = async () => {
            const productId = location.pathname.slice(10).toUpperCase()
            const result = await services.getProductById(productId)
            setProduct(result);
        }
    
        fetchApi()
    }, [location])

    return (
        <Wrapper>
            <Container>
                <img 
                    src={product.image} 
                    width="350px"
                    height="350px"
                    alt=""
                />
                <InfoContainer>
                    <InfoTitle>{product.name}</InfoTitle>
                    <InfoDetail>
                        <InfoSubTitle>Price: </InfoSubTitle>
                        {`${product.price} USD`}
                    </InfoDetail>
                    <InfoDetail>
                        <InfoSubTitle>Gemstones: </InfoSubTitle>
                        {product?.gemstone?.map((stone, index) => (
                            index > 0 ? <span key={index}>{`, ${stone}`}</span> : <span key={index}>{stone}</span>
                        ))}
                    </InfoDetail>
                </InfoContainer>
            </Container>
        </Wrapper>
    )
}

export default Product