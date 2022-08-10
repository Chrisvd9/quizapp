import preguntas from "../components/preguntas";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useState, useEffect } from "react";

const Game = () => {
  const navigate = useNavigate();

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(60);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answerShow, setAnswerShow] = useState(false);

  function handleAnswerSubmit(isCorrect, e) {
    // añadir puntuación
    if (isCorrect) setPuntuacion(puntuacion + 1);
    // añadir estilos de pregunta
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
    // cambiar a la siguiente pregunta
    setTimeout(() => {
      if (preguntaActual === preguntas.length - 1) {
        setIsFinished(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
      }
    }, 900);
  }

  useEffect(() => {
  const intervalo = setInterval(() => {

      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisabled(true);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  if (isFinished)
    return (
      <main className="app animate__animated animate__flip">
        <div className="juego-terminado">
          <span>
            {" "}
            <h3>
              Obtuviste {puntuacion} de {preguntas.length}{" "}
            </h3>
          </span>
          <button onClick={() => navigate("/")}> Volver a jugar</button>
          <button onClick={() => {
            setIsFinished(false);
            setAnswerShow(true);
            setPreguntaActual(0);
          }}> Ver Respuestas</button>
        </div>
      </main>
    );

    if(answerShow) return <main className="app">
      <strong>Respuestas</strong>
      <div className="lado-izquierdo">
          <div className="pregunta-numero">
            <p>
              Pregunta {preguntaActual + 1} de {preguntas.length}
            </p>
          </div>
          <div className="titulo">
            <p>{preguntas[preguntaActual].titulo}</p>
          </div>
          <div>
            {preguntas[preguntaActual].opciones.filter((opcion) => opcion.isCorrect )[0].textoRespuesta}
          </div>
          <button onClick={() => {
            if (preguntaActual === preguntas.length - 1) {
              setIsFinished(true);
            } else {
              setPreguntaActual(preguntaActual + 1);
            }
          } } id= 'btn-continue-2'>{preguntaActual === preguntas.length - 1 ? "Volver" : "Siguiente"}</button>
        </div>
      </main>;

  return (
    <div className="container animate__animated animate__fadeInDown">
      <h2>Quiz trivia ultimate generation🤩</h2>
      <main className="app">
        <div className="lado-izquierdo">
          <div className="pregunta-numero">
            <p>
              Pregunta {preguntaActual + 1} de {preguntas.length}
            </p>
          </div>
          <div className="titulo">
            <p>{preguntas[preguntaActual].titulo}</p>
          </div>
          <div className="tiempo-restante">{!areDisabled ? (
          <p>Tiempo restante: <strong>{tiempoRestante}{" "}</strong> </p>) : 
          (<button id="btn-continue" onClick={() => {
            setIsFinished(true);
          }}>
            Continuar
          </button>)}
            
          </div>
        </div>
        <div className="lado-derecho">
          {preguntas[preguntaActual].opciones.map((respuesta) => (
            <button
            disabled = {areDisabled}
              key={respuesta.textoRespuesta}
              onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
            >
              {" "}
              {respuesta.textoRespuesta}{" "}
            </button>
          ))}
        </div>
      </main>
      <div className="btn-header">
        <button id="out" onClick={() => navigate("/")}>
          Salir
        </button>
      </div>
    </div>
  );
};

export default Game;
