import React from "react"

import { Button, Flex, Stack, useToast } from "@chakra-ui/react"
import { Field, Form, Formik, FormikBag } from "formik"
import { InputForm } from "../../../components/Form/InputForm"
import { SectionTitle } from "../../../components/SectionTitle"

import { AvatarField } from "../../../components/AvatarField"
import { useMutationAuthFinishRegister } from "../../../services/api"
import { useLocation, useNavigate } from "react-router-dom"

export const FinishRegister = () => {
  const navigate = useNavigate()
  const snackbar = useToast()
  const { state }: any = useLocation()

  const { mutate: finishRegister } = useMutationAuthFinishRegister()

  if (!state) {
    navigate("/")
  }

  const onSubmit = (values, formik: FormikBag<any, any>) => {
    finishRegister(
      {
        name: values.name,
        email: state.email,
        isAdmin: false,
        created_at: new Date(),
      },
      {
        onSettled: () => {
          formik.setSubmitting(false)
        },
        onSuccess: () => {
          snackbar({
            title: "Cadastro finalizado",
            description: "Sua conta foi criada com sucesso!",
          })
          setTimeout(() => navigate("dashboard"), 1000)
        },
      }
    )
  }

  return (
    <Flex
      width="100vw"
      height="100vh"
      direction="column"
      align="center"
      justify="center"
    >
      <Flex
        width="100%"
        maxWidth={600}
        bg="background.50"
        p={[4, 8]}
        borderRadius={8}
        direction="column"
      >
        <Formik onSubmit={onSubmit} initialValues={{}} validateOnBlur={false}>
          {({ values }) => (
            <Form noValidate>
              <AvatarField name="avatar" size="2xl" avatarFieldName={null} />

              <SectionTitle title="Complete seu cadastro" />

              <Stack spacing={8} minWidth={200}>
                <Field
                  title="Nome completo"
                  name="name"
                  required
                  validateFieldIndicator
                  component={InputForm}
                />

                <Button
                  mt="6"
                  size="lg"
                  // isLoading={isLoading}
                  loadingText="Navegando"
                  colorScheme="blue"
                  type="submit"
                >
                  Continuar
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  )
}
