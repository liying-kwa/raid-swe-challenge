'use client'

import { Box, Button, Center, Heading, Link, Text } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants/constants";

interface Transaction {
    totalPrice: number,
    items: TransactionItem[],
    created_at: string,
}

interface TransactionItem {
    fruit: string,
    quantity: number,
    price: number,
}

export default function Transactions() {
    // fetch transactions data
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(`${BACKEND_URL}/transactions`)
            .then((response) => response.json())
            .then((data) => setTransactions(data))
            .catch((err) => setError(err));
    }, []);

    console.log(transactions);

    return (
        <main className="bg-white flex min-h-screen flex-col">
            <Center w='100%' h={32} bgColor='teal'>
                <Heading>Transactions</Heading>
            </Center>
            {!error &&
                <TableContainer m={32} border="2px solid" borderColor="gray.100" borderRadius="lg">
                    <Table variant='striped' colorScheme='teal'>
                        <Thead>
                            <Tr>
                                <Th>Number of items</Th>
                                <Th>Total price</Th>
                                <Th>Date & Time</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {transactions.map((transaction, index) =>
                                <Tr key={index}>
                                    <Td>{transaction.items.map((x) => x.quantity).reduce((a, b) => a + b)}</Td>
                                    <Td>${transaction.totalPrice}</Td>
                                    <Td>{new Date(transaction.created_at).toLocaleString('en-US', { timeZone: 'Asia/Singapore' })} SGT</Td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            }
            {error && <Heading ml={32} mt={24} mb={24} as='h3' size='lg' color='red.500'> Error retrieving data from database</Heading>}
            <Box ml={32}>
                <Button colorScheme='teal' size='md'>
                    <Link href='/'>
                        Back to Home
                    </Link>
                </Button>
            </Box>
        </main>
    );
}