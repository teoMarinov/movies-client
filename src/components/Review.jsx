import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/axiosConfig'
import './Review.css'
import { Paper } from '@mui/material';
import axios from 'axios';


export const Review = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState({});

    const [review, setReview] = useState('')

    const getMovieData = () => {
        api.get(`/api/v1/movies/${movieId}`)
            .then(response => setMovie(response.data))
    }

    const handlePost = () => {
        const data = {
            reviewBody: review,
            imdbId: movieId,
        }
        api.post('/api/v1/reviews', data)
            .catch(err => console.log(err))
            .then(response => console.log(response))
            .then(() => getMovieData())
            .finally(() => console.log('1'))
    }

    useEffect(() => {
        getMovieData()
    }, [movieId])

    return (
        <>
            <Paper>
                <div className='movie-card-container'>
                    <div className="movie-card">
                        <div className="movie-detail">
                            <div className="movie-poster">
                                <img src={movie.poster} alt="" />
                            </div>
                            <div className="movie-title">
                                <h4>{movie.title}</h4>
                            </div>
                            <div className="movie-title">
                                <input onChange={(e) => setReview(e.target.value)} />
                                <button onClick={handlePost}>send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
            <div>
                {movie.reviewIds?.map(review => (
                    <div key={review.id.timestamp}>
                        {review.body}
                    </div>

                ))}
            </div>
        </>
    )
}
