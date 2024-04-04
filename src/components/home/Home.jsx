/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Hero } from "../hero/Hero"



export  const Home = ({ movies = [] }) => {
  return (
    <Hero movies={movies}/>
  )
}
