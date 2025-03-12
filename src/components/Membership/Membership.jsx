import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Membership.css';
import ArrowButton from '../common/ArrowButton';

const Membership = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessingPayment(false);
      setShowDemo(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const handleCancelMembership = () => {
    if (window.confirm('Are you sure you want to cancel your membership?')) {
      setShowDemo(false);
    }
  };

  const membershipPlans = [
    {
      type: 'basic',
      name: 'Sample Tests',
      price: 'Free!',
      features: [
        'Try before you buy',
        '5 questions per test',
        'Front-end & back-end tests',
        'A variety of question formats'
      ],
      color: '#8B6B4E',
      buttonText: 'Try it today'
    },
    {
      type: 'premium',
      name: 'Post a Job',
      price: 'Free!',
      features: [
        'Advertise specific job board',
        'Share for 30 days',
        'Screen and pre-qualify candidates',
        'Resumes sent by email or via your ATS link'
      ],
      color: '#8B6B4E',
      buttonText: 'Post a job',
      recommended: true
    },
    {
      type: 'institution',
      name: 'Assessment Pack',
      price: '₹4999/year',
      features: [
        'Unlimited invites',
        '30 days testing access',
        'Unlimited results access',
        '30 questions per test',
        '100% Money Back Guarantee'
      ],
      color: '#8B6B4E',
      buttonText: 'Buy now'
    }
  ];

  return (
    <div className="membership-container">
      <ArrowButton onClick={() => navigate(-1)} />
      
      <div className="membership-header">
        <h1>Choose a Plan. Uncover Awesome Artifacts.</h1>
        <p>Get unlimited access to our artifact collection. When you need more details or high-resolution images, just purchase an extension anytime.</p>
      </div>
      
      {showDemo ? (
        <div className="current-membership">
          <div className="membership-badge">
            <span className="checkmark">✓</span>
            <h2>Active Membership</h2>
          </div>
          
          <div className="membership-details">
            <p><strong>Plan:</strong> {selectedPlan.name}</p>
            <p><strong>Start Date:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Renewal Date:</strong> {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          </div>
          
          <div className="membership-actions">
            <button className="cancel-button" onClick={handleCancelMembership}>
              Cancel Membership
            </button>
          </div>
        </div>
      ) : (
        <div className="plans-container-horizontal">
          {membershipPlans.map((plan) => (
            <div 
              key={plan.type} 
              className={`plan-card-horizontal ${selectedPlan?.type === plan.type ? 'selected' : ''} ${plan.recommended ? 'recommended' : ''}`}
            >
              <h2 className="plan-name">{plan.name}</h2>
              
              <ul className="plan-features-list">
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <span className="feature-check">✓</span> {feature}
                  </li>
                ))}
              </ul>
              
              <div className="plan-price-tag">{plan.price}</div>
              
              <button 
                className="plan-action-button"
                onClick={() => handleSubscribe(plan)}
                disabled={processingPayment}
              >
                {processingPayment && selectedPlan?.type === plan.type ? (
                  <span className="loading-spinner"></span>
                ) : (
                  plan.buttonText
                )}
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="membership-benefits">
        <h2>Membership Benefits</h2>
        
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🔍</div>
            <h3>Enhanced Access</h3>
            <p>Gain access to our complete collection of high-resolution artifact images and detailed documentation.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">📚</div>
            <h3>Educational Resources</h3>
            <p>Access exclusive educational materials, research papers, and contextual information about artifacts.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">💾</div>
            <h3>Download & Share</h3>
            <p>Download artifact information for research, presentations, or educational purposes.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">🏛️</div>
            <h3>Support Preservation</h3>
            <p>Your membership directly supports our efforts to document, preserve, and share India's archaeological heritage.</p>
          </div>
        </div>
      </div>
      
      <div className="membership-faq">
        <h2>Frequently Asked Questions</h2>
        
        <div className="faq-item">
          <h3>How will my membership fee be used?</h3>
          <p>Your membership supports our ongoing efforts to document, digitize, and preserve archaeological artifacts. Funds are used for equipment, storage, research, and maintaining our digital platform.</p>
        </div>
        
        <div className="faq-item">
          <h3>Can I upgrade my membership?</h3>
          <p>Yes, you can upgrade your membership at any time. The price difference will be prorated based on your current subscription period.</p>
        </div>
        
        <div className="faq-item">
          <h3>Is there a refund policy?</h3>
          <p>We offer a 14-day money-back guarantee if you're not satisfied with your membership. After that period, we do not provide refunds for canceled memberships.</p>
        </div>
        
        <div className="faq-item">
          <h3>Do you offer discounts for students?</h3>
          <p>Yes, we offer a 30% discount for students with valid ID. Please contact our support team to verify your student status and receive your discount code.</p>
        </div>
      </div>
    </div>
  );
};

export default Membership; 