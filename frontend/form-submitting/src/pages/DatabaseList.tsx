import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Text,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  VStack,
  Box,
  Flex,
} from "@chakra-ui/react";
// import FetchingApi from "./FetchingApi";
function DataBase() {
  const BASE_URL = "http://127.0.0.1:5000/api/";
  const [post, setPost] = useState([]);
  // const apiGet = () =>{
  //   fetch(BASE_URL)
  //     .then((response) => response.json())
  //     .then((json) => console.log(json))
  // }
//   fetch("http://127.0.0.1:8000/api/characters")
//     fetch(BASE_URL + 'characters')

  useEffect(() => {
      fetch(BASE_URL + 'characters')
      .then((response) => {
        const json = response.json();
        console.log(json);
        if (response.ok) {
          return json;
        }
        throw response;
      })
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, []);

  return (
    <VStack p={5}>
      <TableContainer p={2} border={"1px"} borderRadius="25px">
        <Table variant="striped">
          <TableCaption>Demigods</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Birth Date</Th>
              {/* <Th>Last Name</Th> */}
              {/* <Th>Species</Th> */}
              <Th>godly Parent</Th>
              <Th>Mortal Parent</Th>
              <Th>Camp</Th>
              <Th>Weapon</Th>
            </Tr>
          </Thead>
          <Tbody>
            {post.map((item: any) => (
              <Tr key={item.id} className="try">
                <Td>{item.first_name}</Td>
                <Td>{item.birth_date}</Td>
                {/* de-structure string to get values and get age of character */}
                <Td>{item.godly_parent}</Td>
                <Td>{item.mortal_parent}</Td>
                <Td>{item.camp}</Td>
                <Td>{item.weapon}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}

export default DataBase;
