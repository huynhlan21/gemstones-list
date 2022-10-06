import { Wrapper, Info } from "./Image.style"
import LazyLoad from 'react-lazy-load'

function Image ({to, src, title, price, stones}) {
    return (
        <Wrapper to={to} target="_blank" rel="noopener noreferrer">
            <LazyLoad once>
                <img src={src} alt="" width="100%" height="auto"/>
            </LazyLoad>
            <Info title={title} price={price} stones={stones}/>
        </Wrapper>
    )
}

export default Image