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
import {
  RiAddLine,
  RiContactsLine,
  RiDeleteBin5Fill,
  RiPencilFill,
} from "react-icons/ri"

import { useNavigate } from "react-router-dom"
import { memo, Suspense } from "react"
import {
  queryWokersGetWorkers,
  useMutationWorkersDeleteWorker,
} from "../../../../services/api/workers"
import { IWorkers } from "../../../../services/api/interface/iWorkers"
import { SpinnerFull } from "../../../../components/SpinnerFull"
import { DeleteDialog } from "../../../../utils/deleteDialog"
import { useQueryClient } from "react-query"
import {
  useInfiniteQuery,
  IUseInfinityHook,
} from "../../../../utils/hooks/useInfiniteQuery"
import { FiChevronsDown } from "react-icons/fi"

type StockListRowProps = {
  item: IWorkers
  handleEditItem: any
  handleDeleteItem: any
}

export const WorkersList = memo(() => {
  return (
    <Suspense fallback={<SpinnerFull />}>
      <WorkersListComp />
    </Suspense>
  )
})

const WorkersListComp = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const toast = useToast()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: "workersGetWorkers",
    queryFn: queryWokersGetWorkers,
  }) as IUseInfinityHook<IWorkers[]>

  const { mutate: handleDelete } = useMutationWorkersDeleteWorker({
    onSuccess: () => {
      queryClient.refetchQueries("workersGetWorkers")
      queryClient.refetchQueries("workersGetWorkers-list")
      toast({
        title: "Solicitação deletada com sucesso.",
        status: "success",
      })
    },
  })

  const handleCreateWorker = () => {
    navigate("/workers/create")
  }

  const handleEditItem = (item: IWorkers) => {
    navigate(`/workers/edit/${item.id}`)
  }

  const handleDeleteItem = (item: IWorkers) => {
    handleDelete({ id: item.id })
  }

  return (
    <Box flex={1} borderRadius={8} bg="background.50" p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Flex align="center">
          <Icon as={RiContactsLine} fontSize="2xl" />
          <Center mx={4} height="30px">
            <Divider orientation="vertical" />
          </Center>
          <Heading size="lg" fontWeight="normal">
            Funcionários
          </Heading>
        </Flex>

        <Button
          as="a"
          size="sm"
          fontSize="sm"
          leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          onClick={handleCreateWorker}
        >
          Novo
        </Button>
      </Flex>

      <Table colorScheme="blackAlpha">
        <Thead>
          {!isWideVersion ? (
            <Tr>
              <Th color="gray.500">Nome / Centro de custo</Th>
              <Th width={8} />
            </Tr>
          ) : (
            <Tr>
              <Th color="gray.500">Nome / Centro de custo</Th>
              <Th color="gray.500">CPD</Th>
              <Th width={8} />
            </Tr>
          )}
        </Thead>

        <Tbody>
          {data.map((item) => (
            <WorkersListRow
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

const WorkersListRow = ({
  item,
  handleEditItem,
  handleDeleteItem,
}: StockListRowProps) => {
  const deleteDialog = useDisclosure()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Tr>
      <Td>
        <Box>
          <Text fontWeight="bold">{item.name}</Text>
          <Text fontSize="sm" color="gray.600">
            {item.workplace}
          </Text>
        </Box>
      </Td>

      {isWideVersion && (
        <Td>
          <Text>{item.cpd}</Text>
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
