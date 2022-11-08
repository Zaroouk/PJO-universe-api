import { InputGroup, Input, InputRightElement, Button, Icon } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import React from 'react'

function PasswordInput({placeholder,name, value, isInvalid, onChange}:any) {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

  return (
    <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        isInvalid={isInvalid}
      />
      <InputRightElement width='4.5rem'>
        <Button colorScheme='gray' variant='ghost' borderRadius={50} w='2rem' _hover={{background:'rgba(255,255,255, 0.20)'}}
        h='2rem'
        size='sm' onClick={handleClick}>
          {show ? <ViewOffIcon/> : <ViewIcon />}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput