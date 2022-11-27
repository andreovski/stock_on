import { SelectProps as ChakraSelectProps, Stack } from "@chakra-ui/react"
import { Select } from "chakra-react-select"
import { FormikHelpers } from "formik"
import { ElementType } from "react"

type SelectProps = ChakraSelectProps &
  FormikHelpers<any> & {
    iconLeft?: ElementType
    options: any
  }

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
      <Select
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
        {...props}
      />
    </Stack>
  )
}
