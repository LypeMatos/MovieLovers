//CHAKRA UI IMPORTS
import { Card, Image, Stack, Heading, Flex, Text, Icon } from "@chakra-ui/react";
import { StarIcon, } from "@chakra-ui/icons";
import { AiFillHeart } from 'react-icons/ai';

// eslint-disable-next-line react/prop-types
const MovieCard = ({image, movie, rating, likes}) => {
  return (
    <Card p={2} height='280px' w='170px' bg='blue.800' mb={8}>        
        <Image src={image} alt={movie}/>
            <Stack mt={1}>
                <Heading fontSize='14px' textAlign='center' color='white' noOfLines={1}>{movie}</Heading>
                <Flex gap={2} alignItems='center' justifyContent='center'>
                    <StarIcon fontSize='14px' color='green.400' />
                    <Text color='white' fontSize='14px'>{rating}</Text>
                    <Icon color='#e40186' ml={10} as={AiFillHeart} />
                    <Text color='white' fontSize='14px'>{likes}</Text>
                </Flex>
        </Stack>        
    </Card>
  )
}

export default MovieCard;

/* fazer o ícone de views do filme */