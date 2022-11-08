import React,{useRef,useContext, useState} from 'react'
import { useFormik } from "formik";
import {
    // Tabs,
    // TabList,
    // TabPanels,
    // Tab,
    // TabPanel,
    Grid,
    GridItem,
    FormControl,
    FormLabel,
    Input,
    Button,
    // Modal,
    // ModalOverlay,
    // ModalContent,
    // ModalHeader,
    // ModalFooter,
    // ModalBody,
    // ModalCloseButton,
    // useDisclosure
} from '@chakra-ui/react'
import PasswordInput from '../components/PasswordInput';
import { UserContext } from '../context/UserContext'

function SignIn() {

    const initialRef = useRef(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [authToken, setAuthToken] = useState(null)
    const [authTokenType, setAuthTokenType] = useState(null)
    const [userId, setUserId] = useState('')
    const [, setToken] = React.useContext(UserContext)


    const BASE_URL = 'http://127.0.0.1:8000/token'
    const signInFunc = (e:any) => {
      e.preventDefault();
      let formData = new FormData();
      formData.append('username',username)
      formData.append('password',password)
      formData.append('Content-Type', 'application/x-www-form-urlencoded')

      const requestOptions = {
        method: 'POST',
        body: formData
      }
      fetch(BASE_URL, requestOptions)
        .then(response => {
          if(response.ok) {
            return response.json()
          }
          throw response
        })
        .then(data => {
        console.log(data);
        setAuthToken(data.access_token)
        setAuthTokenType(data.token_type)
        setUserId(data.user_id)
        setUsername(data.username)
        })
        .catch(error => {
          console.log(error);
          alert(error)
        })
    }
    // const [username, setUsername] = useState();
    // const [valueUsername, setValueUsername] = useState();
    // const [password, setPassword] = useState();
    // const [valuePwd, setValuePwd] = useState();

    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      onSubmit: (values, actions) => {
        // alert(JSON.stringify(values, null, 2));
        setPassword(formik.values.password)
        setUsername(formik.values.username)
        actions.resetForm();
        // setClose
      },
    });

    return (
      <form onSubmit={formik.handleSubmit}>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                onChange={formik.handleChange}
                name="username"
                type="text"
                value={formik.values.username}
                placeholder="Username"
                ref={initialRef}
              />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Password</FormLabel>
              {/* <Input
                onChange={handleChangePwd}
                name="password"
                type="password"
                placeholder="Enter Password"
              /> */}
              <PasswordInput
              placeholder="Enter Password"
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
              />
            </FormControl>
          </GridItem>
          <GridItem textAlign='center' colSpan={2}>
            <Button type="submit" onClick={signInFunc} colorScheme="purple">
              Submit
            </Button>{authToken ? 'you are logged in':'you need to login'}
          </GridItem>
        </Grid>
      </form>
    );
}

export default SignIn