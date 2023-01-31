import React from "react"
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
  Tag,
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
import {
  RiAddLine,
  RiPencilFill,
  RiDeleteBin5Fill,
  RiToolsLine,
} from "react-icons/ri"

import { useNavigate } from "react-router-dom"
import { Suspense } from "react"
import {
  queryFerramentasSolicitadasGetItems,
  useMutationFerramentasSolicitadasDeleteItem,
} from "../../../../services/api/ferramentasSolicitadas"
import { SpinnerFull } from "../../../../components/SpinnerFull"
import { format } from "date-fns"
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi"
import { DeleteDialog } from "../../../../utils/deleteDialog"
import { useQueryClient } from "react-query"
import { IFerramentasSolicitadas } from "../../../../services/api/interface/iFerramentas"
import {
  IUseInfinityHook,
  useInfiniteQuery,
} from "../../../../utils/hooks/useInfiniteQuery"

type FerramentasSolicitadasListRowProps = {
  item: IFerramentasSolicitadas
  handleEditItem: any
  handleDeleteItem: any
}

export const FerramentasSolicitadasList = () => {
  return (
    <Suspense fallback={<SpinnerFull />}>
      <FerramentasSolicitadasListComp />
    </Suspense>
  )
}

const FerramentasSolicitadasListComp = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const queryClient = useQueryClient()

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: "FerramentasSolicitadasGetItems",
    queryFn: queryFerramentasSolicitadasGetItems,
  }) as IUseInfinityHook<IFerramentasSolicitadas[]>

  const { mutate: handleDelete } = useMutationFerramentasSolicitadasDeleteItem({
    onSuccess: () => {
      queryClient.refetchQueries("FerramentasSolicitadasGetItems")
      queryClient.refetchQueries("FerramentasSolicitadasGetItems-list")
      toast({
        title: "Solicitação deletada com sucesso.",
        status: "success",
      })
    },
  })

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const handleCreateItem = () => {
    navigate("/ferramentas-solicitadas/create")
  }

  const handleEditItem = (item: any) => {
    navigate(`/ferramentas-solicitadas/edit/${item.id}`)
  }

  const handleDeleteItem = (item: any) => {
    handleDelete({ id: item.id })
  }

  return (
    <Box flex={1} borderRadius={8} bg="background.50" p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Flex align="center">
          <Icon as={RiToolsLine} fontSize="2xl" />
          <Center mx={4} height="30px">
            <Divider orientation="vertical" />
          </Center>
          <Heading size="lg" fontWeight="normal">
            Ferramentas solicitadas
          </Heading>
        </Flex>

        <Button
          as="a"
          size="sm"
          fontSize="sm"
          leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          onClick={handleCreateItem}
        >
          Novo
        </Button>
      </Flex>
      <Table colorScheme="blackAlpha">
        <Thead>
          {!isWideVersion ? (
            <Tr>
              <Th color="gray.500">N˚ Sol. / Funcionário</Th>
              <Th width={8} />
            </Tr>
          ) : (
            <Tr>
              <Th color="gray.500">N˚ Sol. / Funcionário</Th>
              <Th color="gray.500">Ferramentas</Th>
              <Th color="gray.500">Data</Th>
              <Th width={8} />
            </Tr>
          )}
        </Thead>

        <Tbody>
          {data.map((item) => (
            <FerramentasSolicitadasListRow
              key={item.id}
              item={item}
              handleEditItem={handleEditItem}
              handleDeleteItem={handleDeleteItem}
            />
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

const FerramentasSolicitadasListRow = ({
  item,
  handleEditItem,
  handleDeleteItem,
}: FerramentasSolicitadasListRowProps) => {
  const deleteDialog = useDisclosure()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Tr>
      <Td>
        <Box>
          <Text fontWeight="bold">{item.number}</Text>
          <Text fontSize="sm" color="gray.600">
            {item.worker.name}
          </Text>
        </Box>
      </Td>

      {isWideVersion && (
        <Td>
          <Flex position="relative" gap={2} align="center">
            {item.priority && (
              <Icon
                position="absolute"
                left={-8}
                as={FiChevronsUp}
                fontSize="lg"
                color="red.600"
              />
            )}
            {item.tools.map((tool) => (
              <Tag fontSize="sm" color="gray.600" isTruncated>
                {tool.name}
              </Tag>
            ))}
          </Flex>
        </Td>
      )}

      {isWideVersion && (
        <Td>
          <Box>
            <Text fontSize="md" color="gray.600">
              {item.date && format(new Date(item.date), "dd/MM/yyyy")}
            </Text>
          </Box>
        </Td>
      )}

      <Td>
        <Flex gap={2}>
          <IconButton
            aria-label="Editar"
            variant="ghost"
            size="sm"
            fontSize="sm"
            icon={<Icon as={RiPencilFill} fontSize="20" />}
            onClick={() => handleEditItem(item)}
          />
          <IconButton
            aria-label="Deletar"
            variant="ghost"
            size="sm"
            fontSize="sm"
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
            onDelete={() => handleDeleteItem(item)}
            {...deleteDialog}
          />
        </Flex>
      </Td>
    </Tr>
  )
}
