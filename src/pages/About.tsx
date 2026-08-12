import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-4">
      
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider">
          About PharmaCare
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Your Health, Our Highest Priority
        </h1>
        <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
          PharmaCare is a modern healthcare e-commerce platform providing 100% certified prescription medicines, medical equipment, and dermocosmetics.
        </p>
      </section>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1">
          <span className="text-3xl font-extrabold text-emerald-600">10,000+</span>
          <span className="text-xs font-medium text-slate-500 block uppercase">Satisfied Customers</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1">
          <span className="text-3xl font-extrabold text-emerald-600">100%</span>
          <span className="text-xs font-medium text-slate-500 block uppercase">Certified Products</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center space-y-1">
          <span className="text-3xl font-extrabold text-emerald-600">24/7</span>
          <span className="text-xs font-medium text-slate-500 block uppercase">Pharmacist Support</span>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <span>🎯 Our Core Mission</span>
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            To make high-quality, certified pharmaceutical products easily accessible to every family with transparent pricing, expert consultation, and express doorstep delivery.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <span>🛡️ Quality Commitment</span>
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every product in our inventory is sourced directly from licensed pharmaceutical distributors and undergoes rigorous quality checks before dispatch.
          </p>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-slate-900 text-white rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold">Need Personal Health Guidance?</h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Our team of licensed pharmacists is ready to assist you with dosage advice and product recommendations.
        </p>
        <div>
          <Link to="/contact">
            <Button variant="primary" size="lg">
              Contact Our Pharmacists 💬
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;
