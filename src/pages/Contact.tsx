import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '../components/common/Button';

const ContactSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  subject: Yup.string().min(3, 'Subject must be at least 3 characters').required('Subject is required'),
  message: Yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
});

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (_values: any, { resetForm }: any) => {
    setSubmitted(true);
    resetForm();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Get in Touch</h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Have a question about a medicine, dosage, or order status? Send us a message and our pharmacists will respond promptly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        {/* Contact Info Sidebar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Contact Details
          </h2>

          <div className="space-y-4 text-sm text-slate-600">
            <div className="flex items-start space-x-3">
              <span className="text-emerald-600 text-lg">📍</span>
              <div>
                <span className="font-semibold text-slate-900 block">Address</span>
                <span>123 Health Avenue, FPT District, HCMC</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-emerald-600 text-lg">📞</span>
              <div>
                <span className="font-semibold text-slate-900 block">Hotline</span>
                <span>(028) 3812 3456</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-emerald-600 text-lg">✉️</span>
              <div>
                <span className="font-semibold text-slate-900 block">Email Support</span>
                <span>support@pharmacare.com</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-emerald-600 text-lg">⏰</span>
              <div>
                <span className="font-semibold text-slate-900 block">Working Hours</span>
                <span>Mon - Sun: 7:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="md:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            Send Us a Message
          </h2>

          {submitted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium">
              ✅ Thank you for reaching out! Your message has been received and our pharmacy team will get back to you shortly.
            </div>
          )}

          <Formik
            initialValues={{ name: '', email: '', subject: '', message: '' }}
            validationSchema={ContactSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4 text-sm">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Your Name *
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="e.g. John Doe"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <ErrorMessage name="name" component="div" className="text-xs text-red-500 mt-0.5" />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                      Your Email *
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <ErrorMessage name="email" component="div" className="text-xs text-red-500 mt-0.5" />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Subject *
                  </label>
                  <Field
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="e.g. Dosage query for Panadol Extra"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <ErrorMessage name="subject" component="div" className="text-xs text-red-500 mt-0.5" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                    Message *
                  </label>
                  <Field
                    as="textarea"
                    rows={4}
                    id="message"
                    name="message"
                    placeholder="Write your inquiry here..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <ErrorMessage name="message" component="div" className="text-xs text-red-500 mt-0.5" />
                </div>

                <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="w-full">
                  Send Message 📩
                </Button>

              </Form>
            )}
          </Formik>
        </div>

      </div>

    </div>
  );
};

export default Contact;
