import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
import { Review } from './components/Review';

function App() {

  const [movies, setMovies] = useState();


  const getMovies = async () => {
    try {

      const response = await api.get("/api/v1/movies");

      setMovies(response.data);

    }
    catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route path="/Reviews/:movieId" element ={<Review />}  />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;