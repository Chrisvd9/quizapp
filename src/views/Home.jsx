import { useNavigate } from "react-router-dom";
import React from "react";
import 'animate.css';


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="body-home">
      <header>
        <h1 className="h1-home animate__animated animate__bounceInDown">Bienvenidos al quiz de última generación👁</h1>
      </header>
      <div>
        <button id="btn1-home" onClick={() => navigate("/game")}>
          Empezar
        </button>
      </div>
    </div>
  );
};

export default Home;
