"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const FruitListItem_1 = __importDefault(require("./components/FruitListItem"));
const react_2 = require("react");
const fruits = [
    { name: 'Apple', price: 2.00 },
    { name: 'Banana', price: 1.50 },
    { name: 'Pear', price: 2.30 },
    { name: 'Orange', price: 1.80 },
];
function Home() {
    const [selectedFruits, setSelectedFruits] = (0, react_2.useState)([]);
    function addItem() {
        setSelectedFruits([...selectedFruits, { name: 'Apple', quantity: 1, price: 2.00 }]);
    }
    function clearItems() {
        setSelectedFruits([]);
    }
    function changeFruit(index, fruit, price) {
        const newSelectedFruits = selectedFruits;
        newSelectedFruits[index].name = fruit;
        newSelectedFruits[index].price = price;
        setSelectedFruits(newSelectedFruits);
    }
    function changeQuantity(index, quantity, price) {
        const newSelectedFruits = selectedFruits;
        newSelectedFruits[index].quantity = quantity;
        newSelectedFruits[index].price = price;
        setSelectedFruits(newSelectedFruits);
    }
    function submit() {
        console.log(selectedFruits);
    }
    return (<main className="bg-white flex min-h-screen flex-col">
      <react_1.Center w='100%' h={32} bgColor='teal'>
        <react_1.Heading>Jenny's Fruit Store</react_1.Heading>
      </react_1.Center>
      <react_1.Box ml={48}>
        <react_1.Flex w='80%' mt={24} gap={8}>
          <react_1.Button colorScheme='teal' size='md' variant='outline' onClick={addItem}>Add item</react_1.Button>
          <react_1.Button colorScheme='teal' size='md' variant='outline' onClick={clearItems}>Clear items</react_1.Button>
          <react_1.Button colorScheme='teal' size='md' onClick={submit}>Submit</react_1.Button>
        </react_1.Flex>
        {selectedFruits.length == 0 &&
            <react_1.Text mt={8}>
            Cart is empty. Click on "Add item" to start!
          </react_1.Text>}
        {selectedFruits.length != 0 &&
            <react_1.Box>
            <react_1.Flex direction='column' mt={8} gap={4}>
              {<react_1.Flex gap={8}>
                <react_1.Heading as='h5' size='sm' w={256}>Fruit</react_1.Heading>
                <react_1.Heading as='h5' size='sm' w={128}>Quantity</react_1.Heading>
                <react_1.Heading as='h5' size='sm' w={128}>Price</react_1.Heading>
              </react_1.Flex>}
              {selectedFruits.map((selectedFruit, index) => <FruitListItem_1.default key={index} fruits={fruits} defaultFruit={selectedFruit.name} defaultQuantity={selectedFruit.quantity} defaultPrice={selectedFruit.price} index={index} changeFruit={changeFruit} changeQuantity={changeQuantity}/>)}
            </react_1.Flex>

            <react_1.HStack mt={8}>
              <react_1.Heading as='h5' size='sm'>Total price:</react_1.Heading>
              <react_1.Text>${selectedFruits.map((fruit) => fruit.price).reduce((a, b) => a + b)}</react_1.Text>
            </react_1.HStack>
          </react_1.Box>}
      </react_1.Box>
    </main>);
}
exports.default = Home;
