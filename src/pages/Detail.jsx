import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Spinner, Alert, Button, Badge, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "@/services/api";
import { addToCart } from "../features/cart/cartSlice";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const cartItem = useSelector((state) => state.cart.items.find((item) => item.id === product?.id));
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const isMaxReached = product && cartQuantity >= product.stock;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!product) return null;

  return (
    <div>
      <Button variant="link" onClick={() => navigate(-1)} className="mb-4 ps-0">
        &larr; Back
      </Button>
      <Row>
        <Col md={6}>
          <Image 
            src={product.image || "https://placehold.co/600x400?text=No+Image"} 
            alt={product.name} 
            fluid 
            rounded 
            className="shadow-sm"
            style={{ maxHeight: "400px", objectFit: "contain", width: "100%" }}
          />
        </Col>
        <Col md={6}>
          <h2>{product.name}</h2>
          <h4 className="text-primary mb-3">{Number(product.price).toLocaleString('vi-VN')} VNĐ</h4>
          
          <div className="mb-4">
            <Badge bg="info" className="me-2">{product.category}</Badge>
            {product.symptom && <Badge bg="secondary" className="me-2">Symptom: {product.symptom}</Badge>}
            {product.userType && <Badge bg="dark" className="me-2">For: {product.userType}</Badge>}
            <Badge bg={product.stock > 0 ? "success" : "danger"}>
              {product.stock > 0 ? `Stock: ${product.stock}` : "Out of Stock"}
            </Badge>
          </div>

          <p className="lead">{product.description}</p>
          
          {product.brand && <p><strong>Brand:</strong> {product.brand}</p>}
          {product.dosage && <p><strong>Dosage:</strong> {product.dosage}</p>}

          <div className="mt-5">
            <Button 
              size="lg" 
              variant={product.stock > 0 && !isMaxReached ? "primary" : "secondary"} 
              onClick={() => !isMaxReached && dispatch(addToCart(product))}
              disabled={product.stock <= 0 || isMaxReached}
            >
              {product.stock <= 0 ? "Out of Stock" : (isMaxReached ? "Max Reached" : "Add To Cart")}
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Detail;
