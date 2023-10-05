/* REACT IMPORTS */
import { useEffect, useState } from "react";
/* REACT IMPORTS */

//API
import apiAxios from "../api/api";

/* CHAKRA UI IMPORTS */
import { Box, Text, HStack, Button } from "@chakra-ui/react";
/* CHAKRA UI IMPORTS */

/* SWIPER IMPORTS */
import { register } from 'swiper/element/bundle';
import { Swiper, SwiperSlide } from 'swiper/react';
register();
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/swiper-bundle.css';
/* SWIPER IMPORTS */

import MovieCard from "../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getAllMovies = async () => {
      const response = await apiAxios.get('/movies');
      const data = response.data.movies;
      
      setMovies(data);
    }

    getAllMovies();
  }, [])

  return (
    <Box h='100vh' bg='blue.900' mx='auto' w='70%' p={10}>
      <Box mt={10} w='60%'>
        <HStack mb={1} justifyContent='space-between'>
          <Text color='white' as='b'>Filmes</Text>
          <Button color='white' variant='link' mr={2}>Todos</Button>
        </HStack>        
        <Swiper style={{"--swiper-pagination-color": "#e40186"}} slidesPerView={4} pagination={{clickable: true}} autoplay={{delay: 3000}} >
          {movies?.slice(0, 8).map((movie) => (
            <SwiperSlide key={movie._id}><MovieCard image={movie.image} movie={movie.title} rating={movie.rating} likes={movie.likes}/></SwiperSlide>
          ))}
        </Swiper>        
      </Box>
      <Box mt={10} w='60%'>
        <HStack mb={1} justifyContent='space-between'>
          <Text color='white' as='b'>Séries</Text>
          <Button color='white' variant='link' mr={2}>Todas</Button>
        </HStack>        
        <Swiper style={{"--swiper-pagination-color": "#e40186"}} slidesPerView={4} pagination={{clickable: true}} autoplay={{delay: 3000}} >
          {movies?.slice(0, 8).map((movie) => (
            <SwiperSlide key={movie._id}><MovieCard image={movie.image} movie={movie.title} rating={movie.rating} likes={movie.likes}/></SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  )
}

export default Home;