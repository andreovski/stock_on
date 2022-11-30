import { SelectProps as ChakraSelectProps, Stack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { Select } from "chakra-react-select"
import { FormikHelpers } from "formik"
import { ElementType } from "react"

type SelectProps = ChakraSelectProps &
  FormikHelpers<any> & {
    iconLeft?: ElementType
    options: any
  }

const SelectStyled = styled(Select)`
  > div:first-of-type {
    height: 3.4rem;
  }
`

export function InputSelect({
  name,
  title,
  iconLeft: IconLeft,
  size = "lg",
  options,
  onChange,
  setFieldValue,
  ...props
}: SelectProps) {
  return (
    <Stack spacing={4}>
      <SelectStyled
        id={name}
        name={name}
        placeholder={title}
        focusBorderColor="primary"
        bgColor="background.100"
        options={options}
        tagVariant="solid"
        colorScheme="blue"
        onChange={(e: any) => setFieldValue(name, e)}
        //@ts-ignore
        variant="filled"
        size="lg"
        style={{ height: "200px" }}
        {...props}
      />
    </Stack>
  )
}
