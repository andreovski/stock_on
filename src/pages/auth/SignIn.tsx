import React, { useCallback, useState } from "react"

import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react"

import { useAuth } from "../../context/AuthContext"

import { useMutationAuthSignInWithCredentials } from "../../services/api"

import { Input } from "../../components/Form/Input"
import { FcGoogle } from "react-icons/fc"
import { HeaderLogo } from "../../components/Header/HeaderLogo"
import { Link, useNavigate } from "react-router-dom"

export const SignIn = () => {
  const { signInWithCredetials } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState<any>()

  const navigate = useNavigate()

  const { mutate: signIn, isLoading } = useMutationAuthSignInWithCredentials({
    onError: (data: any) => {
      setError(data)
    },
    onSuccess: ({ user }) => {
      signInWithCredetials(user)
      setError(null)
      navigate("/dashboard")
    },
  })

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()

      if (email && password) {
        signIn({ email, password })
      }
    },
    [email, password, signIn]
  )

  const handleKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        onSubmit(e)
      }
    },
    [onSubmit]
  )

  return (
    <Flex
      width="100vw"
      height="100vh"
      direction="column"
      align="center"
      justify="center"
    >
      <Flex textAlign="center" mb="8">
        <HeaderLogo size="4xl" />
      </Flex>

      {error && (
        <Flex mb={2}>
          <Alert status="warning" borderRadius={6}>
            <AlertIcon mr="6" />
            <Box>
              <AlertDescription>
                <Text>{`E-mail e/ou senha inválido.`}</Text>
              </AlertDescription>
            </Box>
          </Alert>
        </Flex>
      )}

      <Flex
        as="form"
        onKeyDown={handleKeyDown}
        width="100%"
        maxW={360}
        bg="background.50"
        p={8}
        borderRadius={8}
        direction="column"
      >
        <Flex align="center" mb="6">
          <Button
            variant="outline"
            isFullWidth
            disabled
            leftIcon={<FcGoogle fontSize="20" />}
          >
            Login com Google
          </Button>
        </Flex>
        <Stack spacing={4}>
          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>

        <Button
          mt="6"
          size="lg"
          isLoading={isLoading}
          loadingText="Entrando"
          onClick={onSubmit}
        >
          Entrar
        </Button>

        <Flex mt="6" justify="center">
          <Text fontSize={14}>
            {`Ainda não possui uma conta? `}
            <ChakraLink as={Link} to={"/signup"}>
              <strong>Crie uma nova</strong>
            </ChakraLink>
            .
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
