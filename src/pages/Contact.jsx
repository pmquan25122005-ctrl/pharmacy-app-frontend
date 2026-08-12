import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, Button, Row, Col, Alert } from "react-bootstrap";
import { useState } from "react";

const ContactSchema = Yup.object().shape({
  name: Yup.string().matches(/^[a-zA-ZÀ-ỹ\s]{2,}$/, "Name must be at least 2 characters and contain no numbers").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string().required("Message is required").min(10, "Message is too short"),
});

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    // Simulate sending message
    setTimeout(() => {
      setSubmitted(true);
      resetForm();
    }, 500);
  };

  return (
    <Row className="justify-content-center mt-4">
      <Col md={8}>
        <Card className="shadow-sm">
          <Card.Header as="h4" className="bg-primary text-white">Contact Us</Card.Header>
          <Card.Body>
            {submitted && <Alert variant="success">Your message has been sent successfully. We will get back to you soon!</Alert>}
            <Formik
              initialValues={{ name: '', email: '', message: '' }}
              validationSchema={ContactSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label>Name</label>
                    <Field name="name" className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-3">
                    <label>Email</label>
                    <Field name="email" type="email" className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-4">
                    <label>Message</label>
                    <Field name="message" as="textarea" rows={5} className={`form-control ${errors.message && touched.message ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="message" component="div" className="invalid-feedback" />
                  </div>

                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Contact;
