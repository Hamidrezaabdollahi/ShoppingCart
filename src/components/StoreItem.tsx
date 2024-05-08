import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { HiMinus, HiPlus } from "react-icons/hi"
import { useShoppingCart } from "../context/ShoppingCartContext"

type StoreItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const { decreaseCartQuantity, getItemQuantity, increaseCartQuantity, removeFromCart } = useShoppingCart()
  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={imgUrl} height="300px" style={{ objectFit: "cover" }} ></Card.Img>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="text-muted ms-2">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (<Button className="w-100" onClick={()=>increaseCartQuantity(id)} >+ add to cart</Button>) : (
            <div className="d-flex flex-column align-items-center " style={{ gap: ".5rem" }}>
              <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                <Button onClick={()=>decreaseCartQuantity(id)}><HiMinus /></Button>
                <div><span className="fs-3">{quantity} </span>in the cart</div>
                <Button onClick={()=>increaseCartQuantity(id)}><HiPlus /></Button>
              </div>
              <Button variant="danger" size="sm" onClick={()=>removeFromCart(id)} >Remove</Button>
            </div>
          )}
        </div> 
      </Card.Body>
    </Card>
  )
}
