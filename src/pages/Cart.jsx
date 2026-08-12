import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { increaseQuantity, decreaseQuantity, removeItem, clearCart } from "../features/cart/cartSlice";

const Cart = () => {
  const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="text-center mt-5">
        <h3>Your cart is empty</h3>
        <Button as={Link} to="/" variant="primary" className="mt-3">Continue Shopping</Button>
      </div>
    );
  }

  return (
    <Row>
      <Col md={8}>
        <h2>Shopping Cart</h2>
        <Table responsive hover className="mt-4">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="d-flex align-items-center">
                  <img src={item.image || "https://placehold.co/50"} alt={item.name} style={{ width: "50px", height:"50px", objectFit:"cover", marginRight: "10px" }} />
                  {item.name}
                </td>
                <td>{Number(item.price).toLocaleString('vi-VN')} VNĐ</td>
                <td>
                  <Button variant="outline-secondary" size="sm" onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button variant="outline-secondary" size="sm" disabled={item.quantity >= item.stock} onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
                </td>
                <td>{Number(item.totalPrice).toLocaleString('vi-VN')} VNĐ</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => dispatch(removeItem(item.id))}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="outline-danger" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
      </Col>
      
      <Col md={4}>
        <Card className="mt-4">
          <Card.Header as="h5">Order Summary</Card.Header>
          <Card.Body>
            <div className="d-flex justify-content-between mb-3">
              <span>Total Items:</span>
              <strong>{totalQuantity}</strong>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span>Total Price:</span>
              <strong className="fs-4 text-primary">{Number(totalPrice).toLocaleString('vi-VN')} VNĐ</strong>
            </div>
            <Button variant="success" size="lg" className="w-100" onClick={() => navigate('/checkout')}>
              Proceed To Checkout
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
