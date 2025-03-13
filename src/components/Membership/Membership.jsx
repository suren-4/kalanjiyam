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

  const plans = [
    {
      title: "Basic Explorer",
      price: "₹999",
      duration: "/year",
      features: [
      
        "Instant artifact feed access",
        "Monthly curated collections",
        "10% discount at museum shop",
        "Quarterly newsletter subscription",
        "Live sessions with the Archaelogist"
      ],
      recommended: false
    },
    {
      title: "Kalanjiyam Patron",
      price: "₹2,499",
      duration: "/year",
      features: [
    
        "Instant artifact feed access",
        "Exclusive excavatory documentaries",
        "Behind-the-scenes updates",
        "20% discount at museum shop",
        "Access to exclusive artifact lectures",
        "Live sessions with the Archaelogist",
       
        "Quarterly artifact magazine",
      ],
      recommended: true
    }
  ];

  return (
    <div className="membership-container">
      <ArrowButton onClick={() => navigate(-1)} />
      
      <div className="membership-header">
        <h1>Explore Ancient Artifacts Like Never Before</h1>
        <p>Subscribe to get instant access to our extensive artifact collection with real-time updates and exclusive content.</p>
      </div>
      
      {showDemo ? (
        <div className="current-membership">
          <div className="membership-badge">
            <span className="checkmark">✓</span>
            <h2>Active Membership</h2>
          </div>
          
          <div className="membership-details">
            <p><strong>Plan:</strong> {selectedPlan.title}</p>
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
          {plans.map((plan) => (
            <div 
              key={plan.title} 
              className={`plan-card-horizontal ${selectedPlan?.title === plan.title ? 'selected' : ''} ${plan.recommended ? 'recommended' : ''}`}
            >
              <h2 className="plan-name">{plan.title}</h2>
              
              <ul className="plan-features-list">
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <span className="feature-check">✓</span> {feature}
                  </li>
                ))}
              </ul>
              
              <div className="plan-price-tag">{plan.price} {plan.duration}</div>
              
              <button 
                className="plan-action-button"
                onClick={() => handleSubscribe(plan)}
                disabled={processingPayment}
              >
                {processingPayment && selectedPlan?.title === plan.title ? (
                  <span className="loading-spinner"></span>
                ) : (
                  'Subscribe'
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
            <div className="benefit-icon">🔄</div>
            <h3>Real-Time Updates</h3>
            <p>Get instant notifications about new artifact discoveries and additions to our collection.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">🎯</div>
            <h3>Personalized Feed</h3>
            <p>Receive customized artifact recommendations based on your interests and browsing history.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">��️</div>
            <h3>Exclusive Access</h3>
            <p>Get special access to curator talks, guided tours, and preview events.</p>
          </div>
          
          <div className="benefit-card">
            <div className="benefit-icon">📱</div>
            <h3>Instant Access</h3>
            <p>Browse and explore artifacts anytime, anywhere through our mobile-friendly platform.</p>
          </div>
        </div>
      </div>
      
      <div className="membership-faq">
        <h2>Frequently Asked Questions</h2>
        
        <div className="faq-item">
          <h3>How soon can I access the artifact feed after subscribing?</h3>
          <p>Access is instant! As soon as your payment is processed, you'll have immediate access to the artifact feed based on your subscription level.</p>
        </div>
        
        <div className="faq-item">
          <h3>What's the difference between Basic and Heritage memberships?</h3>
          <p>While both plans include instant artifact feed access, Heritage Patrons get additional benefits like exclusive content, curator-led tours, behind-the-scenes updates, and special event access.</p>
        </div>
        
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
        
        <div className="faq-item">
          <h3>How does the artifact feed work?</h3>
          <p>All members get instant access to our artifact feed with real-time updates. Heritage Patrons additionally receive exclusive content, behind-the-scenes stories, and curator insights with their updates.</p>
        </div>
      </div>
    </div>
  );
};

export default Membership; 