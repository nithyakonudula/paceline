import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AnnouncementBar from '../components/AnnouncementBar';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { products } from '../data/products';

const stepFields = [
  {
    id: 'type',
    title: 'What type of running do you do?',
    options: ['Road', 'Trail', 'Gym', 'Everyday'],
  },
  {
    id: 'experience',
    title: "What's your experience?",
    options: ['Beginner', 'Intermediate', 'Advanced'],
  },
  {
    id: 'priority',
    title: "What's most important to you?",
    options: ['Speed', 'Comfort', 'Stability', 'Cushioning'],
  },
  {
    id: 'frequency',
    title: 'How often do you run?',
    options: ['Occasionally', '2–3 times a week', '4+ times a week'],
  },
];

export default function FindYourShoePage({ onOpenSearch, mobileOpen, onToggleMenu, onCloseMenu }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    type: '',
    experience: '',
    priority: '',
    frequency: '',
  });

  const recommendedProduct = useMemo(() => {
    const scored = products.map((product) => {
      let score = 0;
      if (product.type === answers.type) score += 5;
      if (product.category.includes(answers.priority) || product.tags.includes(answers.priority)) score += 3;
      if (answers.experience === 'Beginner' && product.category === 'Road Running') score += 2;
      if (answers.experience === 'Advanced' && product.type === 'Trail') score += 2;
      if (answers.frequency === '4+ times a week' && product.tag === 'BESTSELLER') score += 2;
      if (answers.priority === 'Comfort' && product.cushioning.startsWith('5')) score += 4;
      if (answers.priority === 'Stability' && product.stability >= '5/5') score += 4;
      if (answers.priority === 'Speed' && product.category === 'Road Running') score += 3;
      if (answers.type === 'Trail' && product.type === 'Trail') score += 4;
      return { product, score };
    });

    return scored.sort((a, b) => b.score - a.score)[0]?.product;
  }, [answers]);

  const currentQuestion = stepFields[step];

  const chooseOption = (value) => {
    setAnswers((current) => ({ ...current, [currentQuestion.id]: value }));
    setStep((current) => Math.min(current + 1, stepFields.length));
  };

  const isComplete = Object.values(answers).every(Boolean);

  return (
    <>
      <AnnouncementBar />
      <Navbar cartCount={0} onOpenSearch={onOpenSearch} mobileOpen={mobileOpen} onToggleMenu={onToggleMenu} onCloseMenu={onCloseMenu} />
      <main className="page-shell quiz-page">
        <div className="container quiz-box">
          <h1>Find Your Perfect Run.</h1>

          {!isComplete && step < stepFields.length ? (
            <>
              <p className="quiz-step-indicator">Question {step + 1} of {stepFields.length}</p>
              <h2>{currentQuestion.title}</h2>
              <div className="quiz-options">
                {currentQuestion.options.map((option) => (
                  <button key={option} type="button" className="quiz-option" onClick={() => chooseOption(option)}>
                    {option}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="recommendation-card">
              <h2>YOUR PERFECT MATCH</h2>
              {recommendedProduct ? (
                <>
                  <img src={recommendedProduct.image} alt={recommendedProduct.name} />
                  <div className="recommendation-summary">
                    <h3>{recommendedProduct.name}</h3>
                    <span>★★★★★ {recommendedProduct.rating}</span>
                    <p>Why it matches: {recommendedProduct.description}</p>
                    <strong>₹{recommendedProduct.price.toLocaleString('en-IN')}</strong>
                    <Link to={`/product/${recommendedProduct.id}`} className="button-primary">VIEW PRODUCT</Link>
                  </div>
                </>
              ) : (
                <p>No recommendation matched yet.</p>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
