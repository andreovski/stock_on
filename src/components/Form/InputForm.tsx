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

  const titleValidated = useMemo(() => {
    return !required ? title : title.concat(" *")
  }, [title, required])

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
      placeholder: titleValidated,
      isValid,
      type,
      setFieldValue,
      ...field,
      ...props,
    }),
    [field, isValid, name, props, setFieldValue, titleValidated, type]
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
      isInvalid={(!!error && !!wasTouched) || (submitCount > 0 && !!error)}
    >
      {Component}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
