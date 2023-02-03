import React, { useEffect } from "react"
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { RiAddLine, RiAdminLine, RiDeleteBin5Fill } from "react-icons/ri"

import { memo, Suspense } from "react"
import {
  queryProfilesGetProfiles,
  useMutationProfilesActiveProfile,
  useMutationProfilesDeleteProfile,
} from "../../../../services/api/profiles"
import { IWorkers } from "../../../../services/api/interface/iWorkers"
import { SpinnerFull } from "../../../../components/SpinnerFull"
import { DeleteDialog } from "../../../../utils/deleteDialog"
import { useQueryClient } from "react-query"
import {
  useInfiniteQuery,
  IUseInfinityHook,
} from "../../../../utils/hooks/useInfiniteQuery"
import { GrUserSettings } from "react-icons/gr"
import { FiChevronsDown } from "react-icons/fi"
import { IProfiles } from "../../../../services/api/interface/iProfiles"
import { Switch } from "../../../../components/Form/Switch"
import { useAuth } from "../../../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { UserListDialogDelete } from "./UsersListDialogDelete"

type UserListRowProps = {
  item: IProfiles
}

export const UsersList = memo(() => {
  const { eu } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!eu.isAdmin) navigate("/dashboard")
  }, [eu, navigate])

  return (
    <Suspense fallback={<SpinnerFull />}>
      <UsersListComp />
    </Suspense>
  )
})

const UsersListComp = () => {
  const navigate = useNavigate()
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  })

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: "ProfilesGetProfiles",
    queryFn: queryProfilesGetProfiles,
  }) as IUseInfinityHook<IProfiles[]>

  return (
    <Box flex={1} borderRadius={8} bg="background.50" p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Flex align="center">
          <Icon as={GrUserSettings} fontSize="2xl" />
          <Center mx={4} height="30px">
            <Divider orientation="vertical" />
          </Center>
          <Heading size="lg" fontWeight="normal">
            Usuários
          </Heading>
        </Flex>

        <Button
          as="a"
          size="sm"
          fontSize="sm"
          leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          onClick={() => navigate("/usuarios/novo")}
        >
          Novo
        </Button>
      </Flex>

      <Table colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th color="gray.500">Nome / E-mail</Th>
            <Th color="gray.500">Ativo</Th>
            {!isMobile && <Th width={8} />}
          </Tr>
        </Thead>

        <Tbody>
          {data.map((item) => (
            <UsersListRow key={item.id} item={item} />
          ))}
        </Tbody>
      </Table>

      {hasNextPage && (
        <Button
          w="100%"
          mt={4}
          variant="ghost"
          leftIcon={<Icon as={FiChevronsDown} />}
          onClick={() => fetchNextPage()}
        >
          Carregar outros itens
        </Button>
      )}
    </Box>
  )
}

const UsersListRow = ({ item }: UserListRowProps) => {
  const queryClient = useQueryClient()
  const toast = useToast()
  const deleteDialog = useDisclosure()
  const dialogConfirmDeletation = useDisclosure()

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  })

  const { mutate } = useMutationProfilesActiveProfile({
    onSuccess: () => {
      toast({ status: "success", title: "Usuário alterado com sucesso!" })
      queryClient.invalidateQueries("ProfilesGetProfiles-list")
    },
  })

  const handleVerify = (event) => {
    mutate({ id: item.id, verified: event })
  }

  return (
    <Tr>
      <Td>
        <Flex flexDir="column" position="relative" gap={2}>
          {item.isAdmin && (
            <Icon
              position="absolute"
              left={-8}
              as={RiAdminLine}
              fontSize="lg"
              color="red.600"
            />
          )}
          <Text fontWeight="bold">{item.name}</Text>
          <Text fontSize="sm" color="gray.600">
            {item.email}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Switch
          direction="column"
          onChange={(e) => handleVerify(e.target.checked)}
          isChecked={item.verified}
          isDisabled={item.isAdmin}
        />
      </Td>

      {!isMobile && (
        <Td>
          <Flex gap={2}>
            <IconButton
              aria-label="Deletar"
              variant="ghost"
              size="sm"
              fontSize="sm"
              disabled={item.isAdmin}
              icon={
                <Icon
                  as={RiDeleteBin5Fill}
                  fontSize="20"
                  _hover={{
                    color: "red.600",
                  }}
                />
              }
              onClick={() => deleteDialog.onOpen()}
            />

            <DeleteDialog
              title="Deletar registro"
              content="Tem certeza que deseja deletar o registro selecionado?"
              onDelete={() => dialogConfirmDeletation.onOpen()}
              {...deleteDialog}
            />
          </Flex>
        </Td>
      )}

      {dialogConfirmDeletation.isOpen && (
        <UserListDialogDelete userData={item} {...dialogConfirmDeletation} />
      )}
    </Tr>
  )
}
