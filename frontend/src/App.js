import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Search from "./components/Search";
import ImageCard from "./components/ImageCard";
import { Container, Row, Col } from "react-bootstrap";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [word, setWord] = useState("");
  const [images, setImages] = useState([]); // cuando la aplicacion arranca no tenemos imagenes

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(word);
    fetch(
      `https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`
    )
      .then((result) => result.json()) // esto devuelve si es success. Tambien devuelve una promesa
      .then((data) => {
        setImages([{ ...data, title: word }, ...images]); // le pasamos un array de imagenes existente.
      }) // tenemos que resolver la promesa de arriba. data es info que manda el server
      .catch((err) => {
        console.log(err);
      }); // ocurre si la promesa fue rechazada
    setWord("");
  };

  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  return (
    <div>
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      {/* Se itera por la lista de imagenes y se va mostrando cada imagen a medida que se busca en el input */}
      <Container className="mt-4">
        <Row xs={1} md={2} lg={3}>
          {images.map((image, i) => (
            <Col key={i} className="pb-3">
              <ImageCard image={image} deleteImage={handleDeleteImage} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
