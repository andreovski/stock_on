import {
  Box,
  Button,
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
} from "@chakra-ui/react"
import { RiAddLine, RiPencilFill } from "react-icons/ri"

import { Pagination } from "../../../../components/Pagination"
import { useNavigate } from "react-router-dom"
import { Suspense } from "react"
import { useQueryStockGetItems } from "../../../../services/api"
import { SpinnerFull } from "../../../../components/SpinnerFull"
import { IStock } from "../../../../services/api/interface/iStock"

export const StockList = () => {
  return (
    <Suspense fallback={<SpinnerFull />}>
      <StockListComp />
    </Suspense>
  )
}

const StockListComp = () => {
  const navigate = useNavigate()

  const { data = [] } = useQueryStockGetItems()

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

  return (
    <Box flex={1} borderRadius={8} bg="background.50" p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Estoque
        </Heading>

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
                <Box>
                  <IconButton
                    aria-label="Editar"
                    size="sm"
                    fontSize="sm"
                    icon={<Icon as={RiPencilFill} fontSize="20" />}
                    onClick={() => handleEditItem(item)}
                  />
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Pagination />
    </Box>
  )
}
