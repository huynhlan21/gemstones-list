import { routes } from "../../utils/config"
import { Wrapper, Box } from "./Products.style"
import { StyledHeading, Navbar } from "../../components/Styles"
import ProductList from "./ProductList"

function Products () {
    return (
        <Wrapper>
            {/* header */}
            <Box>
                <StyledHeading title="Gemstone" />
                <Navbar items={[{name: "Home", to: routes.home}, {name: "Products", to: routes.products}]}/>
            </Box>

            {/* product list */}
            <ProductList />
        </Wrapper>
    )
}

export default Products