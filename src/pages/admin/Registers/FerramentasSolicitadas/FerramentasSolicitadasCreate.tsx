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
import { FieldWorkers } from "../../../../components/Fields/FieldWorkers"
import { FieldToolsMultiselect } from "../../../../components/Fields/FieldToolsMultiselect"
import { SectionTitle } from "../../../../components/SectionTitle"
import { Field, Form, Formik } from "formik"
import { useQueryClient } from "react-query"
import {
  useMutationFerramentasSolicitadasInsertFerramentaSolicitada,
  useQueryFerramentasSolicitadasGetFerramentasSolicitadas,
} from "../../../../services/api/ferramentasSolicitadas"
import { format } from "date-fns"

export function FerramentasSolicitadasCreate() {
  const navigate = useNavigate()
  const toast = useToast()
  const queryClient = useQueryClient()

  const { data = [] } =
    useQueryFerramentasSolicitadasGetFerramentasSolicitadas()

  const lastNumberOfFerramentas = useMemo(() => {
    const item: number[] = data.map((item) => item.number)
    return Math.max(...item) + 1 || 1
  }, [data])

  const validationSchema = useMemo(() => {
    return Yup.object({
      number: Yup.number().typeError("Campo deve ser numérico"),
      tools: Yup.array().required("Campo obrigatório"),
      worker: Yup.object().required("Campo obrigatório"),
      note: Yup.string().max(500, "O limite máximo de caracteres é de 500."),
      date: Yup.date().required("Campo obrigatório"),
    })
  }, [])

  const { mutate } =
    useMutationFerramentasSolicitadasInsertFerramentaSolicitada({
      onSuccess: () => {
        queryClient.invalidateQueries([
          "FerramentasSolicitadasGetFerramentasSolicitadas",
        ])
      },
    })

  const onSubmit = useCallback(
    (values, formik) => {
      const worker = values.worker.value
      const tools = values.tools.map((tool) => tool.value)

      mutate(
        { ...values, worker, tools },
        {
          onSuccess: () => {
            formik.resetForm({})

            toast({
              title: "Ferramenta cadastrada com sucesso.",
              status: "success",
            })

            setTimeout(() => {
              navigate("/ferramentas-solicitadas")
            }, 500)
          },
          onSettled: () => {
            formik.setSubmitting(false)
          },
        }
      )
    },
    [toast, navigate, mutate]
  )

  const initialValue = {
    number: lastNumberOfFerramentas,
    date: format(new Date(), "yyyy-MM-dd"),
  }

  return (
    <Box flex={1} borderRadius={8} bg="background.50" p="8">
      <Heading size="lg" fontWeight="normal" color="font">
        Nova solicitação de ferramenta
      </Heading>

      <Divider my="6" borderColor="gray.400" />

      <SectionTitle title="Dados Básicos" />

      <Formik
        onSubmit={onSubmit}
        initialValues={initialValue}
        validationSchema={validationSchema}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Form>
            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
                <Field
                  name="number"
                  type="text"
                  title="N˚ solicitação"
                  component={InputForm}
                  required
                  disabled
                />
                <FieldWorkers
                  name="worker"
                  title="Funcionário"
                  component={InputForm}
                  required
                />
                <Field
                  name="date"
                  type="date"
                  title="Data da solicitação"
                  component={InputForm}
                  required
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
                <FieldToolsMultiselect
                  name="tools"
                  title="Ferramentas"
                  component={InputForm}
                  required
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
                <Field
                  name="priority"
                  title="Prioridade"
                  type="switch"
                  direction="row"
                  component={InputForm}
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
                <Field
                  name="note"
                  type="textarea"
                  title="Observação"
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
                  onClick={() => navigate("/ferramentas-solicitadas")}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
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
