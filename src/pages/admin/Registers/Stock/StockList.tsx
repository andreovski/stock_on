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
  RiArchiveLine,
  RiDeleteBin5Fill,
  RiPencilFill,
} from "react-icons/ri"

import { Pagination } from "../../../../components/Pagination"
import { useNavigate } from "react-router-dom"
import { Suspense } from "react"
import {
  useMutationStockDeleteItem,
  useQueryStockGetItems,
} from "../../../../services/api"
import { SpinnerFull } from "../../../../components/SpinnerFull"
import { IStock } from "../../../../services/api/interface/iStock"
import { DeleteDialog } from "../../../../utils/deleteDialog"
import { useQueryClient } from "react-query"

type StockListRowProps = {
  item: IStock
  handleEditItem: any
  handleDeleteItem: any
}

export const StockList = () => {
  return (
    <Suspense fallback={<SpinnerFull />}>
      <StockListComp />
    </Suspense>
  )
}

const StockListComp = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const toast = useToast()

  const { data = [] } = useQueryStockGetItems()

  const { mutate: handleDelete } = useMutationStockDeleteItem({
    onSuccess: () => {
      queryClient.refetchQueries("StockGetItems")
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

  const handleCreateUser = () => {
    navigate("/stock/create")
  }

  const handleEditItem = (item: IStock) => {
    navigate(`/stock/edit/${item.id}`)
  }

  const handleDeleteItem = (item: any) => {
    handleDelete({ id: item.id })
  }

  return (
    <Box flex={1} borderRadius={8} bg="background.50" p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Flex align="center">
          <Icon as={RiArchiveLine} fontSize="2xl" />
          <Center mx={4} height="30px">
            <Divider orientation="vertical" />
          </Center>
          <Heading size="lg" fontWeight="normal">
            Estoque
          </Heading>
        </Flex>

        <Button
          as="a"
          size="sm"
          fontSize="sm"
          leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          onClick={handleCreateUser}
        >
          Novo
        </Button>
      </Flex>
      <Table colorScheme="blackAlpha">
        <Thead>
          {!isWideVersion ? (
            <Tr>
              <Th color="gray.500">Ferramenta / MOD</Th>
              <Th width={8} />
            </Tr>
          ) : (
            <Tr>
              <Th color="gray.500">Ferramenta / MOD</Th>
              <Th color="gray.500">Tamanho / Estado</Th>
              <Th color="gray.500">Quantidade / Local</Th>
              <Th width={8} />
            </Tr>
          )}
        </Thead>

        <Tbody>
          {data.map((item: IStock) => (
            <StockListRow
              key={item.id}
              item={item}
              handleEditItem={handleEditItem}
              handleDeleteItem={handleDeleteItem}
            />
          ))}
        </Tbody>
      </Table>

      <Pagination />
    </Box>
  )
}

const StockListRow = ({
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
            {item.mod}
          </Text>
        </Box>
      </Td>

      {isWideVersion && (
        <Td>
          <Box>
            <Text fontWeight="bold">{item.size}</Text>
            <Text fontSize="sm" color="gray.600">
              {item.state}
            </Text>
          </Box>
        </Td>
      )}

      {isWideVersion && (
        <Td>
          <Box>
            <Text fontWeight="bold">{item.amount}</Text>
            <Text fontSize="sm" color="gray.600">
              {item.locate}
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
