"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const react_2 = require("react");
function FruitListItem(props) {
    const [selectedFruit, setSelectedFruit] = (0, react_2.useState)(props.defaultFruit);
    const [quantity, setQuantity] = (0, react_2.useState)(props.defaultQuantity);
    const [price, setPrice] = (0, react_2.useState)(props.defaultPrice);
    return (<react_1.Flex gap={8}>
            <react_1.Select w={256} defaultValue={selectedFruit} onChange={(event) => {
            const newSelectedFruit = event.target.value;
            const fruitPrice = props.fruits.filter((fruitOption) => newSelectedFruit === fruitOption.name)[0].price;
            const price = fruitPrice * quantity;
            setSelectedFruit(newSelectedFruit);
            setPrice(price);
            props.changeFruit(props.index, newSelectedFruit, price);
        }}>
                {props.fruits.map((fruit) => <option value={fruit.name}>{fruit.name}</option>)}
            </react_1.Select>
            <react_1.NumberInput w={128} min={1} max={99} defaultValue={1} onChange={(valueString) => {
            const newQuantity = Number(valueString);
            const fruitPrice = props.fruits.filter((fruitOption) => selectedFruit === fruitOption.name)[0].price;
            const price = fruitPrice * newQuantity;
            setQuantity(newQuantity);
            setPrice(price);
            props.changeQuantity(props.index, newQuantity, price);
        }}>
                <react_1.NumberInputField />
                <react_1.NumberInputStepper>
                    <react_1.NumberIncrementStepper />
                    <react_1.NumberDecrementStepper />
                </react_1.NumberInputStepper>
            </react_1.NumberInput>
            <react_1.Text>${price}</react_1.Text>
        </react_1.Flex>);
}
exports.default = FruitListItem;
