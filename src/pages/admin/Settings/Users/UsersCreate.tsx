import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react"
import { Field, Form, Formik, FormikBag } from "formik"
import { Suspense, useMemo } from "react"
import { RiUserAddLine } from "react-icons/ri"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { InputForm } from "src/components/Form/InputForm"
import { SectionTitle } from "src/components/SectionTitle"
import { SpinnerFull } from "src/components/SpinnerFull"
import {
  useMutationAuthFinishRegister,
  useMutationAuthSignUpWithCredentials,
} from "src/services/api"
import * as Yup from "yup"

export const UsersCreate = () => {
  return (
    <Suspense fallback={<SpinnerFull />}>
      <UserCreateComp />
    </Suspense>
  )
}

const UserCreateComp = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const queryClient = useQueryClient()

  const invalidPassword = "A senha não atende as exigências!"

  const { mutate: finishRegister } = useMutationAuthFinishRegister({
    onSuccess: () => {
      toast({
        status: "success",
        title: "Usuário criado com sucesso!",
      })

      queryClient.invalidateQueries("ProfilesGetProfiles-list")
      setTimeout(() => navigate("/usuarios"), 500)
    },
  })

  const { mutate: createAccount } = useMutationAuthSignUpWithCredentials({
    onError: (data: any) => {
      if (data?.message === "User already registered") {
        toast({
          status: "error",
          title: "Já existe um conta registrada na base com este e-mail",
        })
      } else {
        toast({ status: "error", title: data?.message })
      }
    },
  })

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .email("E-mail não valido.")
        .required("Campo obrigatório."),
      password: Yup.string()
        .required("Campo obrigatório.")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          invalidPassword
        ),
      confirm_password: Yup.string()
        .required("Campo obrigatório")
        .oneOf([Yup.ref("password"), null], "Senhas não conferem!"),
    })
  }, [])

  const warningPasswordMessage = (error): boolean => {
    return (error?.password || "").includes(invalidPassword)
  }

  const onSubmit = (values, formik: FormikBag<any, any>) => {
    createAccount(
      { email: values.email, password: values.password },
      {
        onError: (error: any) => {
          if (error.msg === "User already registered") {
            formik.setFieldError(
              "email",
              "Já existe uma conta registrada para esse e-mail."
            )
          }
        },
        onSettled: () => {
          formik.setSubmitting(false)
        },
        onSuccess: (data: any) => {
          finishRegister({
            id: data.id,
            name: values.name,
            email: values.email,
            isAdmin: values.idAdmin,
            created_at: new Date(),
          })
        },
      }
    )
  }

  return (
    <Box flex={1} borderRadius={8} bg="background.50" p="8">
      <Flex align="center">
        <Icon as={RiUserAddLine} fontSize="2xl" />
        <Center mx={4} height="30px">
          <Divider orientation="vertical" />
        </Center>
        <Heading size="lg" fontWeight="normal">
          Usuários
        </Heading>
      </Flex>

      <Divider my="6" borderColor="gray.400" />

      <Formik
        onSubmit={onSubmit}
        initialValues={{}}
        validationSchema={validationSchema}
        validateOnBlur={false}
      >
        {({ isSubmitting, errors, values }) => (
          <Form>
            <SectionTitle title="Dados de acesso" mt={0} />

            <Stack
              direction={["column", "row"]}
              align="center"
              spacing={4}
              paddingBottom={4}
            >
              <Avatar size="lg" name={values?.name} />

              <Field
                name="name"
                type="text"
                title="Nome"
                validateFieldIndicator
                component={InputForm}
              />
            </Stack>

            <Stack spacing={4} minWidth={200}>
              <Field
                name="email"
                type="email"
                title="E-mail"
                validateFieldIndicator
                component={InputForm}
              />

              <SimpleGrid minChildWidth={200} spacing={4} width="100%">
                <Field
                  name="password"
                  type="password"
                  title="Senha provisória"
                  validateFieldIndicator
                  component={InputForm}
                />
                <Field
                  name="confirm_password"
                  type="password"
                  title="Confirme a senha provisória"
                  validateFieldIndicator
                  component={InputForm}
                />
              </SimpleGrid>

              <Field
                name="isAdmin"
                type="switch"
                direction="row"
                title="Administrador"
                component={InputForm}
              />
            </Stack>

            {warningPasswordMessage(errors) && (
              <Flex mt={4}>
                <Alert status="warning" borderRadius={6}>
                  <AlertIcon mr="6" />
                  <Box>
                    <AlertTitle mb="2">Sua senha deve conter:</AlertTitle>
                    <AlertDescription>
                      <Text>{`Letras maiusculas e minusculas.`}</Text>
                      <Text>{`Ao menos um número.`}</Text>
                      <Text>{`Ao menos um caracter especial.`}</Text>
                    </AlertDescription>
                  </Box>
                </Alert>
              </Flex>
            )}

            <Flex direction="row" align="flex-end" justify="flex-end">
              <Button
                aria-label="voltar"
                variant="ghost"
                size="lg"
                mr="4"
                onClick={() => navigate("/usuarios")}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                mt="6"
                size="lg"
                isLoading={isSubmitting}
                loadingText="Criando sua conta"
                isDisabled={isSubmitting}
              >
                Criar conta
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
