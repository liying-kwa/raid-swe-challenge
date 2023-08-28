import { Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Text } from "@chakra-ui/react";
import { FruitDetails } from "../page";
import { useState } from "react";


interface FruitListItemProps {
    fruits: FruitDetails[],
    defaultFruit: string,
    defaultQuantity: number,
    defaultPrice: number,
    index: number,
    changeFruit: (index: number, fruit: string, price: number) => void,
    changeQuantity: (index: number, quantity: number, price: number) => void,
}

export default function FruitListItem(props: FruitListItemProps) {
    const [selectedFruit, setSelectedFruit] = useState(props.defaultFruit)
    const [quantity, setQuantity] = useState(props.defaultQuantity)
    const [price, setPrice] = useState(props.defaultPrice);

    return (
        <Flex gap={8}>
            <Select
                w={256}
                defaultValue={selectedFruit}
                onChange={(event) => {
                    const newSelectedFruit = event.target.value;
                    const fruitPrice = props.fruits.filter((fruitOption) => newSelectedFruit === fruitOption.name)[0].price;
                    const price = fruitPrice * quantity;
                    setSelectedFruit(newSelectedFruit);
                    setPrice(price);
                    props.changeFruit(props.index, newSelectedFruit, price);
                }}
            >
                {props.fruits.map((fruit) => <option value={fruit.name}>{fruit.name}</option>)}
            </Select>
            <NumberInput
                w={128}
                min={1}
                max={99}
                defaultValue={1}
                onChange={(valueString) => {
                    const newQuantity = Number(valueString);
                    const fruitPrice = props.fruits.filter((fruitOption) => selectedFruit === fruitOption.name)[0].price;
                    const price = fruitPrice * newQuantity;
                    setQuantity(newQuantity);
                    setPrice(price);
                    props.changeQuantity(props.index, newQuantity, price);

                }}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Text>${price}</Text>
        </Flex>
    );
}