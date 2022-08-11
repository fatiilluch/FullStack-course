import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [word, setWord] = useState("");
  const [images, setImages] = useState([]); // cuando la aplicacion arranca no tenemos imagenes

  console.log(images);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    //console.log(e.target[0].value);
    console.log(word);
    fetch(
      `https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`
    )
      .then((result) => result.json()) // esto devuelve si es success. Tambien devuelve una promesa
      .then((data) => {
        setImages([data, ...images]); // le pasamos un array de imagenes existente.
      }) // tenemos que resolver la promesa de arriba. data es info que manda el server
      .catch((err) => {
        console.log(err);
      }); // ocurre si la promesa fue rechazada
    setWord("");
  };

  return (
    <div>
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
    </div>
  );
}

export default App;
