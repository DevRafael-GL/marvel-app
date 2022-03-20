import React from "react";
import "./LandingPage.css";
import Spider from "../../Assets/spider-man.png";
import Video from "../../Assets/video/JUDGMENT DAY Teaser Trailer _ Marvel Comics.mp4";

export const LandingPage = () => {
  return (
    <section className="landingPage">
      <div className="backcground">
        <div className="video">
          <video autoPlay muted loop>
            <source src={Video} type="video/mp4" />
          </video>
        </div>
      </div>
      <header className="header">
        <div>
          <h2 className="logo">MARVEL</h2>
        </div>
        <div className="links">
          <h3>CHARACTERS</h3>
          <h3>COMICS</h3>
          <h3>STORIES</h3>
          <h3>EVENTS</h3>
        </div>
      </header>
      <main className="landing">
        <div className="landingLeft">
          <h1>MARVEL</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem eaque
            earum tempore vitae ad praesentium, enim qui non quae odit,
            cupiditate autem sapiente numquam, necessitatibus laudantium
            architecto molestiae quo cum. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. In accusamus, minima quas est iure ut magni facere
            ipsum! Dolor sed ut praesentium neque animi minus eius corrupti
            mollitia, sequi alias!
          </p>

          <button>CHARACTERS</button>
        </div>
        <div className="landingRight">
          <img src={Spider} alt="" />
        </div>
      </main>
    </section>
  );
};
