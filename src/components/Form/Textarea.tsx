import {
  Icon,
  Textarea as ChakraTextarea,
  InputGroup,
  InputLeftElement,
  TextareaProps as ChakraTextareaProps,
  InputRightElement,
  Stack,
  FormLabel,
} from "@chakra-ui/react"
import React, { ElementType } from "react"

interface TextareaProps extends ChakraTextareaProps {
  iconLeft?: ElementType
  iconRight?: ElementType
  isDefault?: boolean
}

export function Textarea({
  name,
  title,
  iconLeft: IconLeft,
  iconRight: IconRight,
  size = "lg",
  isDefault = true,
  ...props
}: TextareaProps) {
  return (
    <Stack spacing={4}>
      <InputGroup>
        {IconLeft && (
          <InputLeftElement
            pointerEvents="none"
            paddingTop={!isDefault ? "1.10rem" : undefined}
            children={<Icon as={IconRight} mt={2} mr={2} fontSize="22" />}
          />
        )}
        <ChakraTextarea
          id={name}
          name={name}
          placeholder={title}
          paddingTop={!isDefault ? "1.10rem" : undefined}
          focusBorderColor={"primary"}
          bgColor="background.100"
          variant="filled"
          size="lg"
          {...props}
        />
        {!isDefault && <FormLabel>{title}</FormLabel>}
        {IconRight && (
          <InputRightElement
            pointerEvents="none"
            paddingTop={!isDefault ? "1.10rem" : undefined}
            children={<Icon as={IconRight} mt={2} mr={2} fontSize="22" />}
          />
        )}
      </InputGroup>
    </Stack>
  )
}
