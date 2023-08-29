'use client'

import { Box, Button, Center, Flex, HStack, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text, color } from '@chakra-ui/react'
import FruitListItem from './components/FruitListItem'
import { useEffect, useState } from 'react'

export interface FruitDetails {
  name: string,
  price: number,
}

interface SelectedFruitDetails {
  name: string,
  quantity: number,
  price: number
}

const fruits = [
  { name: 'Apple', price: 2.00 },
  { name: 'Banana', price: 1.50 },
  { name: 'Pear', price: 2.30 },
  { name: 'Orange', price: 1.80 },
]

export default function Home() {
  const [selectedFruits, setSelectedFruits] = useState<SelectedFruitDetails[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  function addItem() {
    const newSelectedFruits = [...selectedFruits, { name: 'Apple', quantity: 1, price: 2.00 }];
    setSelectedFruits(newSelectedFruits);
    setTotalPrice(newSelectedFruits.map((fruit) => fruit.price).reduce((a, b) => a + b));
  }

  function clearItems() {
    setSelectedFruits([]);
    setTotalPrice(0);
  }

  function changeFruit(index: number, fruit: string, price: number) {
    const newSelectedFruits = selectedFruits;
    newSelectedFruits[index].name = fruit;
    newSelectedFruits[index].price = price;
    setSelectedFruits(newSelectedFruits);
    setTotalPrice(newSelectedFruits.map((fruit) => fruit.price).reduce((a, b) => a + b));
  }

  function changeQuantity(index: number, quantity: number, price: number) {
    const newSelectedFruits = selectedFruits;
    newSelectedFruits[index].quantity = quantity;
    newSelectedFruits[index].price = price;
    setSelectedFruits(newSelectedFruits);
    setTotalPrice(newSelectedFruits.map((fruit) => fruit.price).reduce((a, b) => a + b));
  }

  function submit() {
    console.log(selectedFruits);
  }

  return (
    <main className="bg-white flex min-h-screen flex-col">
      <Center w='100%' h={32} bgColor='teal'>
        <Heading>Jenny's Fruit Store</Heading>
      </Center>
      <Box ml={48}>
        <Flex w='80%' mt={24} gap={8}>
          <Button colorScheme='teal' size='md' variant='outline' onClick={addItem}>Add item</Button>
          <Button colorScheme='teal' size='md' variant='outline' onClick={clearItems}>Clear items</Button>
          <Button colorScheme='teal' size='md' onClick={submit}>Submit</Button>
        </Flex>
        {selectedFruits.length == 0 &&
          <Text mt={8}>
            Cart is empty. Click on "Add item" to start!
          </Text>}
        {selectedFruits.length != 0 &&
          <Box>
            <Flex direction='column' mt={8} gap={4}>
              {<Flex gap={8}>
                <Heading as='h5' size='sm' w={256}>Fruit</Heading>
                <Heading as='h5' size='sm' w={128}>Quantity</Heading>
                <Heading as='h5' size='sm' w={128}>Price</Heading>
              </Flex>
              }
              {selectedFruits.map((selectedFruit, index) =>
                <FruitListItem
                  key={index}
                  fruits={fruits}
                  defaultFruit={selectedFruit.name}
                  defaultQuantity={selectedFruit.quantity}
                  defaultPrice={selectedFruit.price}
                  index={index}
                  changeFruit={changeFruit}
                  changeQuantity={changeQuantity}
                />
              )}
            </Flex>

            <HStack mt={8}>
              <Heading as='h5' size='sm'>Total price:</Heading>
              <Text>${totalPrice}</Text>
            </HStack>
          </Box>
        }
      </Box>
    </main>
  )
}
