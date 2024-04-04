import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../api/axiosConfig'
import './Review.css'
import { Paper } from '@mui/material';
import axios from 'axios';


export const Review = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});

    const [review, setReview] = useState('')

    const handlePost = () => {
        const data = {
            "reviewBody": "testtest",
            "imdbId": "tt8760708",
        }
        api.post('/api/v1/reviews', data)
            .catch(err => console.log(err))
            .then(response => console.log(response))
    }

    useEffect(() => {
        api.get(`/api/v1/movies/${id}`)
            .then(response => setMovie(response.data))
    }, [id])

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
                            </div>
                        </div>
                        <button onClick={handlePost}>send</button>
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
