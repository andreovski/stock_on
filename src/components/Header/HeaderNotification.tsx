import {
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  UseDisclosureProps,
} from "@chakra-ui/react"
import styled from "@emotion/styled"
import { RiLogoutBoxRLine, RiUserAddLine } from "react-icons/ri"
import { useAuth } from "../../context/AuthContext"
import { Dialog } from "../../components/Dialog"

type DialogSignOutType = UseDisclosureProps & {
  handleSignOut: () => void
}

const IconLogOutStyled = styled(RiLogoutBoxRLine)`
  margin-inline: auto;
`

const IconNotificationStyled = styled(RiUserAddLine)`
  margin-inline: auto;
`

export const HeaderActions = () => {
  const { handleSignOut } = useAuth()

  const modalSignOut = useDisclosure()

  return (
    <HStack
      spacing={["2", "4"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.500"
      borderRightWidth={1}
    >
      <IconButton
        aria-label="adicionar usuário"
        borderRadius="lg"
        _hover={{
          bgColor: "gray.200",
        }}
        variant="unstyled"
        icon={<IconNotificationStyled />}
        fontSize="20"
        disabled
        onClick={() => {}}
      />
      <IconButton
        aria-label="sair"
        borderRadius="lg"
        _hover={{
          bgColor: "gray.200",
        }}
        variant="unstyled"
        icon={<IconLogOutStyled />}
        fontSize="20"
        onClick={() => modalSignOut.onOpen()}
      />

      <ModalSignOut handleSignOut={handleSignOut} {...modalSignOut} />
    </HStack>
  )
}

const ModalSignOut = ({
  isOpen,
  onClose,
  handleSignOut,
}: DialogSignOutType) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      header="Deseja sair do sistema?"
      children="Ao sair você precisará logar novamente no sistema na próxima vez que for
      utiliza-lá."
      footer={[
        <Button variant="ghost" onClick={() => onClose()}>
          Cancelar
        </Button>,
        <Button colorScheme="red" onClick={() => handleSignOut()}>
          Sair do sistema
        </Button>,
      ]}
    />
  )
}
