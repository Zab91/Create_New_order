import { Flex, Stack, Box, Text, Divider, Center } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function TransactionList() {
  const { id } = useSelector(state => state.userSlice.value);
  const [order, setOrder] = useState();

  const getOrder = async () => {
    const result = await axios.get(`http://localhost:8000/orderCart/all/${id}`);
    console.log(result.data);
    setOrder(result.data);
  };
  return (
    <>
      <Flex
        minH={"120vh"}
        algin={"center"}
        justify={"center"}
        bg="#fff"
        maxWidth={"506px"}
        // marginBottom={"full"}
      >
        <Stack
          spacing={4}
          mx={"auto"}
          maxW={"lg"}
        >
          <Box
            height="70px"
            marginTop={"25px"}
            paddingTop={"5px"}
          >
            <Text
              fontWeight={"bold"}
              fontSize="2xl"
              align={"center"}
            >
              List Order Pembelian
            </Text>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
