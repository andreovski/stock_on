import {
  FormControl,
  FormErrorMessage,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react"
import { getIn } from "formik"
import { useMemo } from "react"
import { Input } from "./Input"
import { InputSelect } from "./InputSelect"
import { Textarea } from "./Textarea"
import { Switch } from "./Switch"

interface InputProps extends ChakraInputProps {
  title: string
  required?: boolean
  field?: any
  form?: any
  validateFieldIndicator?: boolean
}

export function InputForm({
  title,
  field,
  form,
  required = false,
  validateFieldIndicator,
  type,
  ...props
}: InputProps) {
  const { name, value } = field
  const { errors, touched, submitCount, setFieldValue } = form
  const error = getIn(errors, name)
  const wasTouched = getIn(touched, name)

  const placeholder = type === "select" ? title : " "

  const isValid = useMemo(() => {
    if (validateFieldIndicator && !error && value?.length > 3) {
      return true
    }

    return false
  }, [validateFieldIndicator, error, value])

  const rest = useMemo(
    () => ({
      id: name,
      name,
      isValid,
      type,
      title,
      setFieldValue,
      isDefault: false,
      ...field,
      ...props,
      placeholder,
    }),
    [field, isValid, name, placeholder, props, setFieldValue, title, type]
  )

  const Component = useMemo(() => {
    switch (type) {
      case "textarea":
        return <Textarea {...rest} />
      case "select":
        return <InputSelect {...rest} />
      case "switch":
        return <Switch {...rest} />
      default:
        return <Input {...rest} />
    }
  }, [rest, type])

  return (
    <FormControl
      variant={type !== "switch" ? "floating" : undefined}
      isRequired={required}
      isInvalid={(!!error && !!wasTouched) || (submitCount > 0 && !!error)}
    >
      {Component}
      <FormErrorMessage fontSize="sm">{error}</FormErrorMessage>
    </FormControl>
  )
}
