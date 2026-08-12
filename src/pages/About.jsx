import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div 
        className="bg-primary text-white text-center py-5 mb-5 rounded shadow-sm"
        style={{
          background: "linear-gradient(135deg, #059669, #34d399)"
        }}
      >
        <Container>
          <h1 className="display-4 fw-bold mb-3">About Minh Quân Pharmacy</h1>
          <p className="lead mb-0">
            A trusted pharmacy system, dedicated to community health.
          </p>
        </Container>
      </div>

      <Container>
        <Row className="mb-5 align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <img 
              src="https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Pharmacy" 
              className="img-fluid rounded shadow"
              style={{ objectFit: 'cover', height: '400px', width: '100%' }}
            />
          </Col>
          <Col md={6} className="px-md-5">
            <h2 className="fw-bold mb-4 text-primary">Our Mission</h2>
            <p className="fs-5 text-secondary">
              Minh Quân Pharmacy is committed to providing genuine medical products, pharmaceuticals, medical equipment, and dermocosmetics with the best quality.
            </p>
            <p className="fs-5 text-secondary mb-4">
              Our goal is to make healthcare easy, accessible, and affordable for every family. Your health is our top priority.
            </p>
            <Button as={Link} to="/medicines" variant="outline-primary" size="lg" className="rounded-pill px-4">
              Explore Products
            </Button>
          </Col>
        </Row>

        {/* Core Values */}
        <h2 className="text-center fw-bold mb-5">Core Values</h2>
        <Row className="g-4 mb-5">
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4" style={{ borderRadius: '15px' }}>
              <div className="text-primary mb-3">
                <i className="bi bi-shield-check" style={{ fontSize: '3rem' }}></i>
              </div>
              <Card.Title className="fw-bold">Trusted Quality</Card.Title>
              <Card.Text className="text-muted">
                100% of our products have clear origins, ensuring the highest safety and treatment efficiency.
              </Card.Text>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4" style={{ borderRadius: '15px' }}>
              <div className="text-success mb-3">
                <i className="bi bi-heart-pulse" style={{ fontSize: '3rem' }}></i>
              </div>
              <Card.Title className="fw-bold">Dedicated Consultation</Card.Title>
              <Card.Text className="text-muted">
                Our team of highly qualified pharmacists is always ready to listen and answer all your questions.
              </Card.Text>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 border-0 shadow-sm text-center p-4" style={{ borderRadius: '15px' }}>
              <div className="text-info mb-3">
                <i className="bi bi-truck" style={{ fontSize: '3rem' }}></i>
              </div>
              <Card.Title className="fw-bold">Fast Delivery</Card.Title>
              <Card.Text className="text-muted">
                Supporting online orders, delivering to your door quickly, conveniently, and safely.
              </Card.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
