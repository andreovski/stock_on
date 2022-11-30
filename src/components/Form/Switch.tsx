import React from "react"
import {
  Flex,
  FormLabel,
  Switch as ChakraSwitch,
  SwitchProps,
} from "@chakra-ui/react"

type IProps = SwitchProps & {
  direction: "row" | "column"
}

export const Switch = ({
  title,
  placeholder,
  direction = "column",
  ...props
}: IProps) => {
  return (
    <Flex
      mx={2}
      gap={direction === "row" ? 4 : 1}
      flexDirection={direction}
      alignItems={direction === "row" ? "center" : "flex-start"}
    >
      {direction === "column" && (
        <FormLabel htmlFor={props.name} fontSize="lg" color="gray.500">
          {title}
        </FormLabel>
      )}
      <ChakraSwitch id={props.name} {...props} />
      {direction === "row" && (
        <FormLabel pt="6px" fontSize="lg" color="gray.500">
          {title}
        </FormLabel>
      )}
    </Flex>
  )
}
