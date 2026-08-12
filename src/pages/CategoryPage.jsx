import { useState, useEffect } from "react";
import { Row, Col, Spinner, Alert, Form } from "react-bootstrap";
import { getProducts } from "@/services/api";
import ProductCard from "../components/product/ProductCard";

const CategoryPage = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [selectedUserType, setSelectedUserType] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data.filter(p => {
          if (category === "Medical Device") {
            return p.category === "Medical Equipment" || p.category === "Medical Device";
          }
          if (category === "Cosmetic") {
            return p.category === "Dermocosmetics" || p.category === "Cosmetic";
          }
          return p.category === category;
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  const symptoms = [...new Set(products.map(p => p.symptom).filter(Boolean))];
  const userTypes = [...new Set(products.map(p => p.userType).filter(Boolean))];

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSymptom = selectedSymptom ? product.symptom === selectedSymptom : true;
    const matchUserType = selectedUserType ? product.userType === selectedUserType : true;
    return matchSearch && matchSymptom && matchUserType;
  });

  if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Row>
      <Col md={3}>
        <div className="p-3 filter-sidebar rounded mb-4 shadow-sm">
          <h5>Search in {category}</h5>
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />

          <h5>Filter by Symptom</h5>
          <Form.Select 
            className="mb-4"
            value={selectedSymptom} 
            onChange={(e) => setSelectedSymptom(e.target.value)}
          >
            <option value="">All Symptoms</option>
            {symptoms.map(s => <option key={s} value={s}>{s}</option>)}
          </Form.Select>

          <h5>Filter by User Type</h5>
          <Form.Select 
            value={selectedUserType} 
            onChange={(e) => setSelectedUserType(e.target.value)}
          >
            <option value="">All Types</option>
            {userTypes.map(u => <option key={u} value={u}>{u}</option>)}
          </Form.Select>
        </div>
      </Col>
      <Col md={9}>
        <h2>{category}</h2>
        <Row xs={1} md={2} lg={3} className="g-4 mt-1">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </Row>
      </Col>
    </Row>
  );
};

export default CategoryPage;
