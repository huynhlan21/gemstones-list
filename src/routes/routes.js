import { routes } from "../utils/config"
import { Home, Products, Product } from "../pages"

const publicRoutes = [
    { path: routes.home, component: Home },
    { path: routes.products, component: Products },
    { path: routes.product, component: Product },
  ];
  
export { publicRoutes };