import { useState } from "react";
import "../../styles/static.css";

export default function HelpPage() {

  const faqs = [

    {
      question: "How do I book a bus ticket?",
      answer:
        "Search your route, select your preferred trip, choose seats, and complete payment securely."
    },

    {
      question: "Can I cancel my booking?",
      answer:
        "Yes. Go to My Bookings, select your ticket, and click cancel. Refund policies depend on operator rules."
    },

    {
      question: "When will I receive my refund?",
      answer:
        "Refunds are typically processed within 3–7 business days depending on your payment provider."
    },

    {
      question: "Can I change my travel date?",
      answer:
        "Currently, date changes are not supported. You may cancel and rebook your trip."
    },

    {
      question: "What happens if the bus is delayed?",
      answer:
        "Voyogo provides real-time updates. You will also receive notifications for schedule changes."
    },

    {
      question: "Is my payment secure?",
      answer:
        "Yes. All transactions are protected using enterprise-grade encryption and secure payment gateways."
    },

    {
      question: "How do I contact support?",
      answer:
        "You can reach us via email at support@voyogo.com or call +91 9876543210."
    }

  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (

    <div className="static-container">

      <h1 className="static-title">Help Center</h1>

      <p className="static-text">
        Find answers to common questions and get support for your bookings.
      </p>

      <div className="faq-container">

        {faqs.map((faq, index) => (

          <div key={index} className="faq-item">

            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </div>

            {openIndex === index && (
              <div className="faq-answer">
                {faq.answer}
              </div>
            )}

          </div>

        ))}

      </div>

    </div>

  );

}
