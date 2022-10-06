import { useEffect, useState } from "react";
import LazyLoad from 'react-lazy-load'

import * as services from "../../services"
import Image from "../../components/Image"
import { ImageList } from "./Products.style"

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [totalItem, setTotalItem] = useState(0)

  useEffect(() => {
    let startIndex = 0
    let endIndex = 10

    const handleScroll = () => {
      if((window.innerHeight + window.scrollY) >= document.body.offsetHeight && endIndex < totalItem) {
        startIndex+=10
        endIndex+=10
        fetchApi()
      }
    }

    const fetchApi = async () => {
      const result = await services.getProductList(startIndex, endIndex)

      setTotalItem(result.totalItem)
      setProducts(prev => {
        if (prev.find(product => product.id === result.data[0].id)) {
          return prev
        }

        return [...prev, ...result.data]
      });

    }

    fetchApi()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }

  }, [totalItem])

  return (
    <ImageList>
      {products.map((item) => (
        <LazyLoad key={item.id} placeholder="Loading..." height={460} width={"100%"} threshold={0.2}>
          <Image 
            key={item.id} 
            src={item.image} 
            title={item.name} 
            price={item.price} 
            stones={item.gemstone} 
            to={`/product/@${item.id.toLowerCase()}`}
          />
        </LazyLoad>
      ))}
    </ImageList>
  );
}