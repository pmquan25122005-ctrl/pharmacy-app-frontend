import { useState, useEffect } from "react";
import { Table, Button, Modal, Spinner, Alert } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/services/api";

const ProductSchema = Yup.object().shape({
  name: Yup.string().min(2, "Name must be at least 2 characters").required("Required"),
  price: Yup.number().positive("Must be positive").required("Required"),
  image: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  symptom: Yup.string(),
  userType: Yup.string(),
  description: Yup.string().required("Required"),
  brand: Yup.string(),
  dosage: Yup.string(),
  stock: Yup.number().integer().min(0).required("Required"),
});

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initFetch = async () => {
      await fetchAll();
    };
    initFetch();
  }, []);

  const handleShow = (product = null) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        await fetchAll(); // Refresh list
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, values);
      } else {
        await createProduct(values);
      }
      handleClose();
      await fetchAll();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = editingProduct || {
    name: "",
    price: "",
    image: "",
    category: "Medicine",
    symptom: "",
    userType: "",
    description: "",
    brand: "",
    dosage: "",
    stock: 0,
  };

  if (loading && products.length === 0) return <div className="text-center mt-5"><Spinner animation="border" /></div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <Button variant="success" onClick={() => handleShow()}>+ Add Product</Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price (VNĐ)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td><img src={p.image || "https://placehold.co/40"} alt={p.name} width="40" height="40" style={{objectFit:"cover"}} /></td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{Number(p.price).toLocaleString('vi-VN')} VNĐ</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleShow(p)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={ProductSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, errors, touched }) => (
              <FormikForm>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Name</label>
                    <Field name="name" className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Price (VNĐ)</label>
                    <Field name="price" type="number" step="0.01" className={`form-control ${errors.price && touched.price ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="price" component="div" className="invalid-feedback" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Category</label>
                    <Field name="category" as="select" className="form-select">
                      <option value="Medicine">Medicine</option>
                      <option value="Medical Equipment">Medical Equipment</option>
                      <option value="Dermocosmetics">Dermocosmetics</option>
                    </Field>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Image URL or File Path</label>
                    <Field name="image" className={`form-control ${errors.image && touched.image ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="image" component="div" className="invalid-feedback" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Symptom</label>
                    <Field name="symptom" as="select" className="form-select">
                      <option value="">None</option>
                      <option value="Fever">Fever</option>
                      <option value="Cold">Cold</option>
                      <option value="Sore Throat">Sore Throat</option>
                      <option value="Cough">Cough</option>
                      <option value="Diarrhea">Diarrhea</option>
                      <option value="Digestive">Digestive</option>
                      <option value="Muscle Pain">Muscle Pain</option>
                      <option value="Health Check">Health Check</option>
                      <option value="Immunity">Immunity</option>
                      <option value="Supplement">Supplement</option>
                      <option value="Skin Care">Skin Care</option>
                      <option value="Sun Protection">Sun Protection</option>
                      <option value="Dry Skin">Dry Skin</option>
                      <option value="Sensitive Teeth">Sensitive Teeth</option>
                      <option value="Oral Care">Oral Care</option>
                      <option value="First Aid">First Aid</option>
                      <option value="Protection">Protection</option>
                      <option value="Nasal Congestion">Nasal Congestion</option>
                      <option value="Joint Pain">Joint Pain</option>
                      <option value="Heart Health">Heart Health</option>
                      <option value="Bone Health">Bone Health</option>
                      <option value="Nutrition">Nutrition</option>
                    </Field>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>User Type</label>
                    <Field name="userType" as="select" className="form-select">
                      <option value="">Select User Type</option>
                      <option value="All">All</option>
                      <option value="Adult">Adult</option>
                      <option value="Children">Children</option>
                      <option value="Elderly">Elderly</option>
                    </Field>
                  </div>
                </div>

                <div className="mb-3">
                  <label>Description</label>
                  <Field name="description" as="textarea" rows={3} className={`form-control ${errors.description && touched.description ? 'is-invalid' : ''}`} />
                  <ErrorMessage name="description" component="div" className="invalid-feedback" />
                </div>
                
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label>Brand</label>
                    <Field name="brand" className="form-control" />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>Dosage</label>
                    <Field name="dosage" className="form-control" />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label>Stock</label>
                    <Field name="stock" type="number" className={`form-control ${errors.stock && touched.stock ? 'is-invalid' : ''}`} />
                    <ErrorMessage name="stock" component="div" className="invalid-feedback" />
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <Button variant="secondary" className="me-2" onClick={handleClose}>Cancel</Button>
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Product"}
                  </Button>
                </div>
              </FormikForm>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;
