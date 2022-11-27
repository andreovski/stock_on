import {
  Icon,
  Textarea as ChakraTextarea,
  InputGroup,
  InputLeftElement,
  TextareaProps as ChakraTextareaProps,
  InputRightElement,
  Stack,
} from "@chakra-ui/react"
import React, { ElementType } from "react"

interface TextareaProps extends ChakraTextareaProps {
  iconLeft?: ElementType
  iconRight?: ElementType
}

export function Textarea({
  name,
  title,
  iconLeft: IconLeft,
  iconRight: IconRight,
  size = "lg",
  ...props
}: TextareaProps) {
  return (
    <Stack spacing={4}>
      <InputGroup>
        {IconLeft && (
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={IconRight} mt={2} mr={2} fontSize="22" />}
          />
        )}
        <ChakraTextarea
          id={name}
          name={name}
          placeholder={title}
          focusBorderColor={"primary"}
          bgColor="background.100"
          variant="filled"
          size="lg"
          {...props}
        />
        {IconRight && (
          <InputRightElement
            pointerEvents="none"
            children={<Icon as={IconRight} mt={2} mr={2} fontSize="22" />}
          />
        )}
      </InputGroup>
    </Stack>
  )
}
