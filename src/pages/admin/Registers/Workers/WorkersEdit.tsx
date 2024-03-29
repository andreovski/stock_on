import React from "react"
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
import { Field, Form, Formik } from "formik"
import { useNavigate, useParams } from "react-router-dom"
import { InputForm } from "../../../../components/Form/InputForm"
import { SectionTitle } from "../../../../components/SectionTitle"
import { Suspense } from "react"
import {
  useMutationWorkersEditWorker,
  useQueryWorkersGetWorkerById,
} from "../../../../services/api/workers"
import { SpinnerFull } from "../../../../components/SpinnerFull"

import { useQueryClient } from "react-query"

export function WorkersEdit() {
  return (
    <Suspense fallback={<SpinnerFull size="lg" />}>
      <WorkersEditComp />
    </Suspense>
  )
}

export function WorkersEditComp() {
  const navigate = useNavigate()
  const toast = useToast()
  const queryClient = useQueryClient()
  const { id } = useParams<string>()

  const { data } = useQueryWorkersGetWorkerById({ id })

  const { mutate } = useMutationWorkersEditWorker({
    onSuccess: () => {
      queryClient.invalidateQueries("workersGetWorkers")
      queryClient.invalidateQueries("workersGetWorkers-list")
    },
  })

  const validationSchema = () => {
    return Yup.object({
      name: Yup.string()
        .max(30, "O limite de caracteres deve ser menor ou igual a 30.")
        .required("Campo obrigatório"),
      workplace: Yup.string()
        .max(20, "O limite de caracteres deve ser menor ou igual a 20.")
        .required("Campo obrigatório"),
      cpd: Yup.number()
        .required("Campo obrigatório")
        .typeError("Campo deve ser numérico"),
    })
  }

  const onSubmit = (values, formik) => {
    mutate(values, {
      onSuccess: () => {
        formik.resetForm({ values })

        toast({
          title: "Trabalhador editado com sucesso.",
          status: "success",
        })

        setTimeout(() => {
          navigate("/workers")
        }, 500)
      },
      onSettled: () => {
        formik.setSubmitting(false)
      },
    })
  }

  return (
    <Box flex={1} borderRadius={8} bg="background.50" p="8">
      <Heading size="lg" fontWeight="normal" color="font">
        Novo funcionário
      </Heading>

      <Divider my="6" borderColor="gray.400" />

      <SectionTitle title="Dados Básicos" />

      <Formik
        onSubmit={onSubmit}
        initialValues={data || {}}
        validationSchema={validationSchema}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <Form>
            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
                <Field
                  name="name"
                  type="text"
                  title="Nome completo"
                  component={InputForm}
                  required
                />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
                <Field
                  name="workplace"
                  type="text"
                  title="Centro de custo"
                  component={InputForm}
                  required
                />
                <Field
                  name="cpd"
                  type="number"
                  title="CPD"
                  component={InputForm}
                  required
                />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" align="center" justify="flex-end">
              <HStack spacing="8">
                <Button
                  variant="unstyled"
                  disabled={isSubmitting}
                  onClick={() => navigate("/workers")}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  loadingText="Salvando"
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
