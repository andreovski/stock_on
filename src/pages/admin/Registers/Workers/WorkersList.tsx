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
import { memo, Suspense } from "react"
import { useQueryWorkersGetWorkers } from "../../../../services/api/workers"
import { IWorkers } from "../../../../services/api/interface/iWorkers"
import { SpinnerFull } from "../../../../components/SpinnerFull"

export const WorkersList = memo(() => {
  return (
    <Suspense fallback={<SpinnerFull />}>
      <WorkersListComp />
    </Suspense>
  )
})

const WorkersListComp = () => {
  const navigate = useNavigate()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const handleCreateWorker = () => {
    navigate("/workers/create")
  }

  const handleEditItem = (item: IWorkers) => {
    navigate(`/workers/edit/${item.id}`)
  }

  const { data } = useQueryWorkersGetWorkers()

  return (
    <Box flex={1} borderRadius={8} bg="background.50" p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Funcionários
        </Heading>

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
            <Tr key={item.id}>
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
