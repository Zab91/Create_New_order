import {
  Flex,
  Stack,
  Box,
  Text,
  Divider,
  Button,
  Image,
  Center,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function PaymentMethod() {
  //get user Name
  const { name, id } = useSelector(state => state.userSlice.value);

  //useState upload image payment
  const [image, setImage] = useState("");
  const [paymentIMG, setPaymentIMG] = useState("");
  const [move, setMove] = useState(false);

  //choose file
  const handleChoose = e => {
    console.log("e.target.files", e.target.files);
    setImage(e.target.files[0]);
    console.log(setImage);
  };

  //upload payment image
  const handlePayment = async () => {
    const data = new FormData();
    console.log(data);
    data.append("file", image);
    console.log(data.get("file"));

    const uploadPayment = await axios.post(
      `http://localhost:8000/orderCart/payment`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log(uploadPayment.data);
    setPaymentIMG(uploadPayment.data.paymentImage);
    setImage({ images: "" });

    Swal.fire({
      icon: "success",
      tittle: "Sukses",
      text: "Upload Pembayaran Sukses",
    });
  };
  console.log(image);
  console.log(paymentIMG);

  //Get Id order
  const [orderData, setOrderData] = useState();
  const getIdOrder = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8000/orderCart/all/${id}`,
      );
      console.log("data order Id", result.data);
      setOrderData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getIdOrder();
  }, [id]);

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
              Pembayaran
            </Text>
            <Divider />
            <br />
            <Box
              display={"flex"}
              paddingTop={"3px"}
              justifyContent={"center"}
            >
              <Text fontWeight={"semibold"}>Name: {name}</Text>
            </Box>
          </Box>
          <br />
          <Center>
            <Image
              size={"2xl"}
              //  src={`http://localhost:8000/${}`}
            />
          </Center>
          <Center w="full">
            <form encType="multipart/form-data">
              <Input
                type="file"
                accept="image/*"
                name="file"
                onChange={e => handleChoose(e)}
              />
            </form>
          </Center>
          <Center>
            <Button
              onClick={handlePayment}
              w="full"
              borderColor="yellow.400"
              borderRadius="9px"
              borderWidth="2px"
              _hover={{ bg: "yellow.300" }}
            >
              Upload bukti pembayaran
            </Button>
          </Center>
          <br />
          <Box
            display={"flex"}
            paddingTop={"3px"}
            justifyContent={"center"}
          >
            <Text>Total Harga : NaN</Text>
          </Box>
          <br />
          <Box
            display={"flex"}
            paddingTop={"3px"}
            justifyContent={"center"}
          >
            <Text>List item yang dibeli</Text>
          </Box>
          <br />
          <Box
            mt="10px"
            display="flex"
            justifyContent="flex-end"
          >
            <Button
              // onClick=
              w="full"
              borderColor="yellow.400"
              borderRadius="9px"
              borderWidth="2px"
              _hover={{ bg: "yellow.300" }}
            >
              konfirmasi pembayaran
            </Button>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
