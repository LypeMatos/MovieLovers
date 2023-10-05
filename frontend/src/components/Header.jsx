/* CHAKRA UI IMPORTS */
import { Button, Box, Flex, ButtonGroup, InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
/* CHAKRA UI IMPORTS */

const Header = () => {
  return (
    <Box mx='auto' bgGradient="radial(blue.600, blue.900)" h='25vh' w='70%' p={7}>
      <Box w="100%" p={1}>
        <Flex justifyContent="space-between">
          <ButtonGroup gap={2}>
            <Button color="white" bg='transparent' borderRadius='full' _hover={{bg: 'blue.700'}}>Home</Button>
            <Button color="white" bg='transparent' borderRadius='full' _hover={{bg: 'blue.700'}}>Movies</Button>
            <Button color="white" bg='transparent' borderRadius='full' _hover={{bg: 'blue.700'}}>Series</Button>
          </ButtonGroup>
          <ButtonGroup gap={2}>
            <Button color="white" bg='transparent' borderRadius='full' _hover={{bg: 'blue.700'}}>Login</Button>
            <Button color="white" bg="#e40186" borderRadius='full' _hover={{bg: '#a90063'}}>Sign Up</Button>
          </ButtonGroup> 
        </Flex>
      </Box>
      <Box mt={8} mx='auto' w='80%'>
        <InputGroup>
          <Input
            type="text" 
            borderColor='blue.500' 
            bg='blue.600' 
            borderRadius='full' 
            focusBorderColor='transparent' 
            color='white' 
            placeholder="Busque por um filme/Série..." 
            _placeholder={{color: '#eeee'}}
             _hover={{}}
          />
          <InputRightElement>
            <Button bg='transparent' _hover={{bg: 'transparent'}}>
              <SearchIcon color='white'/>
            </Button>            
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  )
}

export default Header;