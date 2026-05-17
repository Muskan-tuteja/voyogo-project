import "../../styles/static.css";

export default function AboutPage() {

  return (

    <div className="static-container">

      <h1 className="static-title">About Voyogo</h1>

      <p className="static-text">
        Voyogo is a next-generation bus travel platform designed to simplify
        intercity transportation through reliable scheduling, real-time seat
        availability, and secure digital booking. Our mission is to modernize
        ground travel infrastructure with scalable technology and seamless user
        experience.
      </p>

      <h2>Our Mission</h2>

      <p className="static-text">
        We aim to empower travelers with transparent pricing, accurate schedules,
        and safe travel options while providing transport operators with a robust
        digital management ecosystem.
      </p>

      <h2>What We Offer</h2>

      <ul className="static-list">
        <li>Real-time bus search and booking</li>
        <li>Secure digital payments</li>
        <li>Instant booking confirmation</li>
        <li>Live seat availability tracking</li>
        <li>Operator-grade trip management tools</li>
      </ul>

      <h2>Technology Stack</h2>

      <p className="static-text">
        Voyogo leverages enterprise-grade architecture using Spring Boot,
        React, and cloud-ready infrastructure to ensure scalability,
        reliability, and high performance.
      </p>

      <h2>Contact</h2>

      <p className="static-text">
        Email: support@voyogo.com <br />
        Phone: +91 9876543210
      </p>

    </div>

  );

}
