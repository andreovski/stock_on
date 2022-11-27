import React from "react"
import {
  Box,
  Button,
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
} from "@chakra-ui/react"
import { RiAddLine, RiPencilFill } from "react-icons/ri"

import { Pagination } from "../../../../components/Pagination"
import { useNavigate } from "react-router-dom"
import { Suspense } from "react"
import { useQueryFerramentasSolicitadasGetFerramentasSolicitadas } from "../../../../services/api/ferramentasSolicitadas"
import { SpinnerFull } from "../../../../components/SpinnerFull"
import { format } from "date-fns"
import { FiChevronsUp } from "react-icons/fi"

export const FerramentasSolicitadasList = () => {
  return (
    <Suspense fallback={<SpinnerFull />}>
      <FerramentasSolicitadasListComp />
    </Suspense>
  )
}

const FerramentasSolicitadasListComp = () => {
  const navigate = useNavigate()

  const { data = [] } =
    useQueryFerramentasSolicitadasGetFerramentasSolicitadas()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  const handleCreateUser = () => {
    navigate("/ferramentas-solicitadas/create")
  }

  const handleEditItem = (item: any) => {
    navigate(`/ferramentas-solicitadas/edit/${item.id}`)
  }

  return (
    <Box flex={1} borderRadius={8} bg="background.50" p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Ferramentas solicitadas
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
            <React.Fragment key={item.id}>
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
            </React.Fragment>
          ))}
        </Tbody>
      </Table>

      <Pagination />
    </Box>
  )
}
