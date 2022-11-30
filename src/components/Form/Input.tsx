import {
  FormLabel,
  Icon,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps as ChakraInputProps,
  InputRightElement,
  Stack,
} from "@chakra-ui/react"
import { ElementType } from "react"
import { RiCheckLine } from "react-icons/ri"

interface InputProps extends ChakraInputProps {
  iconLeft?: ElementType
  iconRight?: ElementType
  isValid?: boolean
  isDefault?: boolean
}

export function Input({
  name,
  title,
  isValid,
  iconLeft: IconLeft,
  iconRight: IconRight,
  size = "lg",
  isDefault = true,
  ...props
}: InputProps) {
  return (
    <Stack spacing={4}>
      <InputGroup>
        {IconLeft && (
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={IconRight} mt={2} mr={2} fontSize="22" />}
          />
        )}
        <ChakraInput
          focusBorderColor={"primary"}
          paddingTop={!isDefault ? 3 : undefined}
          bgColor="background.100"
          variant="filled"
          size="lg"
          {...props}
        />
        {!isDefault && <FormLabel>{title}</FormLabel>}
        {IconRight && (
          <InputRightElement
            pointerEvents="none"
            children={<Icon as={IconRight} mt={2} mr={2} fontSize="22" />}
          />
        )}
        {isValid && (
          <InputRightElement
            pointerEvents="none"
            children={
              <Icon
                as={RiCheckLine}
                color="green"
                mt={2}
                mr={2}
                fontSize="22"
              />
            }
          />
        )}
      </InputGroup>
    </Stack>
  )
}
