import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, Button, ListGroup, Table } from "react-bootstrap";
import { clearCart } from "../features/cart/cartSlice";
// API imports removed as they are no longer needed here

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customer = location.state?.customer;
  const items = location.state?.items || [];
  const totalPrice = location.state?.totalPrice || 0;
  const totalQuantity = location.state?.totalQuantity || 0;

  useEffect(() => {
    if (!customer) {
      navigate("/");
    } else {
      // Clear the cart when confirming order
      dispatch(clearCart());
    }
  }, [customer, navigate, dispatch]);

  if (!customer) return null;

  return (
    <div className="d-flex justify-content-center mt-4">
      <Card className="w-100 shadow-sm" style={{ maxWidth: '600px' }}>
        <Card.Header className="bg-success text-white text-center">
          <h3>Order Confirmed!</h3>
        </Card.Header>
        <Card.Body>
          <p className="lead text-center">Thank you for your purchase, {customer.fullName}.</p>

          <h5 className="mt-4">Shipping Details</h5>
          <ListGroup variant="flush" className="mb-4">
            <ListGroup.Item><strong>Phone:</strong> {customer.phone}</ListGroup.Item>
            <ListGroup.Item><strong>Email:</strong> {customer.email}</ListGroup.Item>
            <ListGroup.Item><strong>Address:</strong> {customer.address}</ListGroup.Item>
            <ListGroup.Item><strong>Payment:</strong> {customer.paymentMethod}</ListGroup.Item>
          </ListGroup>

          <h5 className="mt-4">Order Items</h5>
          <Table responsive bordered size="sm" className="mb-4">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{Number(item.price).toLocaleString('vi-VN')} VNĐ</td>
                  <td>{Number(item.totalPrice).toLocaleString('vi-VN')} VNĐ</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h5>Order Summary</h5>
          <ListGroup variant="flush" className="mb-4">
            <ListGroup.Item className="d-flex justify-content-between">
              <span>Total Quantity:</span>
              <strong>{totalQuantity}</strong>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex justify-content-between text-success">
              <span>Total Paid:</span>
              <strong>{Number(totalPrice).toLocaleString('vi-VN')} VNĐ</strong>
            </ListGroup.Item>
          </ListGroup>

          <div className="text-center">
            <Button as={Link} to="/" variant="primary">Return to Home</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Confirmation;
