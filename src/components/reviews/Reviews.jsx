/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import { Input, InputBase } from '@mui/material';


const Reviews = () => {

    const params = useParams();
    const movieId = params.movieId;
    const [newReview, setNewReview] = useState('');
    const [movie, setMovie] = useState({});

    const getMovie = () => {
        api.get(`/api/v1/movies/${movieId}`)
            .then(res => {
                setMovie(res.data);
            })
    }

    useEffect(() => {
        getMovie();
    }, [])

    const addReview = async (e) => {
        const data = {
            "reviewBody": "testtest",
            "imdbId": "tt8093700",
        }
        e.preventDefault();
        try {

            api.post('/api/v1/reviews', data)
                .catch(err => console.log(err))
                .then(response => console.log(response))
                .then(() => getMovie())


        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <Input style={{ backgroundColor: "white", borderRadius: '40' }} onChange={(e) => setNewReview(e.target.value)} />
                                    <Button onClick={addReview}>Submit</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        movie.reviewIds?.map((r) => {
                            return (
                                <>
                                    <Row>
                                        <Col>{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews