import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  useToast,
  VStack,
} from "@chakra-ui/react"
import * as Yup from "yup"
import { useCallback, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { InputForm } from "../../../../components/Form/InputForm"
import { SectionTitle } from "../../../../components/SectionTitle"
import { Field, Form, Formik } from "formik"
import { useQueryStockInsertItem } from "../../../../services/api"
import { useQueryClient } from "react-query"

export function StockCreate() {
  const navigate = useNavigate()
  const toast = useToast()
  const queryClient = useQueryClient()

  const validationSchema = useMemo(() => {
    return Yup.object({
      name: Yup.string()
        .max(30, "O limite de caracteres deve ser menor ou igual a 30.")
        .required("Campo obrigatório"),
      mod: Yup.string()
        .max(10, "O limite de caracteres deve ser menor ou igual a 20.")
        .required("Campo obrigatório"),
      size: Yup.number().required("Campo obrigatório"),
      amount: Yup.number().integer().required("Campo obrigatório"),
      state: Yup.string()
        .max(10, "O limite de caracteres deve ser menor ou igual a 20.")
        .required("Campo obrigatório"),
      locate: Yup.string()
        .max(20, "O limite de caracteres deve ser menor ou igual a 20.")
        .required("Campo obrigatório"),
    })
  }, [])

  const { mutate } = useQueryStockInsertItem({
    onSuccess: () => {
      queryClient.invalidateQueries(["StockGetItem"])
    },
  })

  const onSubmit = useCallback(
    (values, formik) => {
      mutate(values, {
        onSuccess: () => {
          setTimeout(() => {
            formik.resetForm({})
            toast({
              title: "Ferramenta cadastrada com sucesso.",
              status: "success",
              duration: 9000,
              isClosable: true,
            })

            navigate("/stock")
          }, 1000)
        },
        onSettled: () => {
          formik.setSubmitting(false)
        },
      })
    },
    [toast, navigate, mutate]
  )

  return (
    <Box flex={1} borderRadius={8} bg="background.50" p="8">
      <Heading size="lg" fontWeight="normal" color="font">
        Novo produto
      </Heading>

      <Divider my="6" borderColor="gray.400" />

      <SectionTitle title="Dados Básicos" />

      <Formik
        onSubmit={onSubmit}
        initialValues={{}}
        validationSchema={validationSchema}
        validateOnBlur={false}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
                <Field
                  name="name"
                  type="text"
                  title="Ferramenta"
                  component={InputForm}
                  required
                />
                <Field
                  name="mod"
                  type="text"
                  title="MOD"
                  component={InputForm}
                  required
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
                <Field
                  name="size"
                  type="text"
                  title="Tamanho"
                  component={InputForm}
                  required
                />
                <Field
                  name="amount"
                  type="number"
                  title="Quantidade"
                  component={InputForm}
                  required
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
                <Field
                  name="state"
                  type="text"
                  title="Estado"
                  component={InputForm}
                  required
                />
                <Field
                  name="locate"
                  type="text"
                  title="Local"
                  component={InputForm}
                  required
                />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="8">
                <Button
                  variant="unstyled"
                  disabled={isSubmitting}
                  onClick={() => navigate("/stock")}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  colorScheme="blue"
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
