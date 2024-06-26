import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import homeImage from "../assets/hero.jpg";

const Slide = () => {
  return (
    <Section id="hero">
      <div className="background">
        <img src={homeImage} alt="" />
      </div>
      <div className="content">
        <div className="title">
          <h1>EVENTOPIA</h1>

        </div>
        <div className="search">
        <p className="text-center text-lg text-gray-700">
          Découvrez nos prochains événements et réservez en ligne dès aujourd'hui !
        </p>
        <p className="text-center text-gray-700 mt-2">
          Avec notre site web, vous pouvez parcourir notre sélection d'événements passionnants et réserver votre place en ligne en quelques clics. Ne manquez pas l'opportunité de participer à nos activités et de créer des souvenirs inoubliables !
        </p>
          <Link
            to="/events"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block mt-2"
          >
            Voir les événements
          </Link>
        </div>
      </div>
    </Section>
  );
};

const Section = styled.section`
  position: relative;
  margin-top: 2rem;
  width: 100%;
  height: 100%;

  .background {
    height: 100%;
    img {
      width: 100%;
      filter: brightness(60%);
    }
  }
  .content {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 3;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    .title {
      color: white;
      h1 {
        font-size: 3rem;
        letter-spacing: 0.2rem;
      }
      p {
        text-align: center;
        padding: 0 30vw;
        margin-top: 0.5rem;
        font-size: 1.2rem;
      }
    }
    .search {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      background-color: #ffffffce; /* Update background color */
      padding: 0.5rem; /* Add padding */
      border-radius: 0.5rem; /* Add border radius */
      .container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 1.5rem;
        label {
          font-size: 1.1rem;
          color: #03045e;
        }
        input {
          background-color: transparent;
          border: none;
          text-align: center;
          color: black;
          &[type="date"] {
            padding-left: 3rem;
          }

          &::placeholder {
            color: black;
          }
          &:focus {
            outline: none;
          }
        }
      }
      button {
        padding: 1rem;
        cursor: pointer;
        border-radius: 0.3rem;
        border: none;
        color: white;
        background-color: #4361ee;
        font-size: 1.1rem;
        text-transform: uppercase;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #023e8a;
        }
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 980px) {
    height: 25rem;
    .background {
      background-color: palegreen;
      img {
        height: 100%;
      }
    }
    .content {
      .title {
        h1 {
          font-size: 1rem;
        }
        p {
          font-size: 0.8rem;
          padding: 1vw;
        }
      }
    }
  }
`;

export default Slide;
