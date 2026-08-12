import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { getProductById, updateProduct } from "@/services/api";

const CheckoutSchema = Yup.object().shape({
  fullName: Yup.string().matches(/^[a-zA-ZÀ-ỹ\s]{2,}$/, "Name must be at least 2 characters and contain no numbers").required("Full name is required"),
  phone: Yup.string().matches(/^[0-9]+$/, "Must contain only digits").max(12, "Maximum 12 digits").required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  paymentMethod: Yup.string().required("Payment method is required"),
});

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, totalQuantity } = useSelector((state) => state.cart);

  if (items.length === 0) {
    return <div className="text-center mt-5"><h3>Your cart is empty</h3></div>;
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Deduct stock for each item in the cart
      for (const item of items) {
        try {
          const product = await getProductById(item.id);
          const newStock = Math.max(0, product.stock - item.quantity);
          await updateProduct(item.id, { ...product, stock: newStock });
        } catch (err) {
          console.error("Failed to update stock for product:", item.id, err);
        }
      }
      // We pass the customer info to the confirmation page using React Router state
      navigate("/confirmation", { state: { customer: values, items, totalPrice, totalQuantity } });
    } catch (error) {
      console.error("Order processing failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <Card className="shadow-sm">
          <Card.Header as="h4" className="bg-primary text-white">Checkout</Card.Header>
          <Card.Body>
            <Formik
              initialValues={{ fullName: '', phone: '', email: '', address: '', paymentMethod: 'Cash' }}
              validationSchema={CheckoutSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label>Full Name</label>
                    <Field name="fullName" className={`form-control ${errors.fullName && touched.fullName ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="fullName" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-3">
                    <label>Phone Number</label>
                    <Field name="phone" className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-3">
                    <label>Email</label>
                    <Field name="email" type="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-3">
                    <label>Delivery Address</label>
                    <Field name="address" as="textarea" rows={3} className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="address" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-4">
                    <label>Payment Method</label>
                    <Field name="paymentMethod" as="select" className="form-select">
                      <option value="Cash">Cash on Delivery</option>
                      <option value="Card">Credit Card</option>
                    </Field>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Total: {Number(totalPrice).toLocaleString('vi-VN')} VNĐ</h5>
                    <Button type="submit" variant="success" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                          Processing...
                        </>
                      ) : (
                        "Place Order"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Checkout;
