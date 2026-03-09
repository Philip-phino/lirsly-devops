import "../styles/Home.css";
import { useEffect } from "react";
import logo from "../assets/lirsly-logo.png";
import butterfly from "../assets/butterfly.png";
import dog from "../assets/dog.png";

function Home() {

  useEffect(() => {

    const elements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting){
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.3 }
    );

    elements.forEach((el) => observer.observe(el));

  }, []);


  return (
    <div className="home-container">

      {/* HERO */}

      <section className="hero">

        <img src={logo} alt="Lirsly" className="logo-animation" />

        <h1 className="hero-title">"The Joy of Giving"</h1>
        <h2 className="hero-sub-title">
          "Where every gift tells a beautiful story."
        </h2>

      </section>


      {/* WHO WE ARE */}

<section className="about animate-on-scroll">

  <div className="about-container">

    <div className="about-dog slide-left">
      <img src={dog} alt="dog" />
    </div>

    <div className="about-text slide-right">
      <h2>Who We Are</h2>

      <p>
        At Lirsly, we believe every gift tells a story. Our mission is to help
        people celebrate life’s special moments with thoughtful and meaningful
        gifts. Whether it’s a birthday, anniversary, celebration, or simply a
        surprise for someone special, every gift should bring joy and create
        lasting memories.
      </p>
    </div>

  </div>

</section>


{/* OUR STORY */}
<section className="story animate-on-scroll">

  <div className="story-wrapper">

    <div className="story-semicircle">

      <div className="story-text slide-left">
        <h2 className="story-title">Our Story</h2>

        <p>
          Lirsly was created with a simple idea — to make gifting more meaningful.
          We carefully curate products that reflect love, thoughtfulness, and
          creativity. Each item is selected to help you express emotions and turn
          ordinary moments into unforgettable memories.
        </p>
      </div>

      <span className="butterfly slide-right">
        <img src={butterfly} alt="butterfly" />
      </span>

    </div>

  </div>

</section>

      {/* WHY */}
    <section className="why">

  <h2>Why Choose Lirsly</h2>

  <div className="why-grid">

    <div className="product-card animate-on-scroll slide-left">
      <h3>Unique Gifts</h3>
      <p>Handpicked items designed to make every moment special.</p>
    </div>

    <div className="product-card animate-on-scroll slide-right">
      <h3>Quality Products</h3>
      <p>We focus on beautiful products that bring joy and value.</p>
    </div>

    <div className="product-card animate-on-scroll slide-left">
      <h3>For Every Occasion</h3>
      <p>Perfect gifts for birthdays, celebrations, and surprises.</p>
    </div>

    <div className="product-card animate-on-scroll slide-right">
      <h3>Made with Love</h3>
      <p>Every gift is meant to create smiles and memories.</p>
    </div>

  </div>

</section>
   

      {/* FEATURED */}

      <section className="featured">

  <h2>Featured Gifts</h2>

  <div className="featured-grid">

    <div className="product-card animate-on-scroll slide-left">
      <img 
        src="https://raw.githubusercontent.com/Philip-phino/Lrisly/d7f20b51e40f0cd0c63c0fadd28cad83beb10cf1/Resin.png"
        alt="Custom Island Story Artwork"
      />
      <h3>Your Own Island Story – Custom Artwork</h3>
    </div>

    <div className="product-card animate-on-scroll slide-left">
      <img 
        src="https://raw.githubusercontent.com/Philip-phino/Lrisly/d7f20b51e40f0cd0c63c0fadd28cad83beb10cf1/Casper.png"
        alt="Meaningful tribute to beloved pets"
      />
      <h3>Meaningful tribute to beloved pets</h3>
    </div>

    <div className="product-card animate-on-scroll slide-right">
      <img 
        src="https://raw.githubusercontent.com/Philip-phino/Lrisly/63145869a624148cfd5b6069cdfc9ff24583beb1/BD%20spl.png"
        alt="Personalized Portrait Illustration"
      />
      <h3>Personalized Portrait Illustration</h3>
    </div>

    <div className="product-card animate-on-scroll slide-right">
      <img 
        src="https://raw.githubusercontent.com/Philip-phino/Lrisly/d7f20b51e40f0cd0c63c0fadd28cad83beb10cf1/Poster.png"
        alt="Custom Moon Phase Collage Poster"
      />
      <h3>Custom Moon Phase Collage Poster</h3>
    </div>

  </div>

</section>


      {/* CTA */}

      <section className="cta">

        <h2>Explore Our Collection</h2>

        <a href="/products" className="shop-btn">
          Shop Now
        </a>

      </section>

    </div>
  );
}

export default Home;