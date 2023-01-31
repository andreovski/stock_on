import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  useDisclosure,
  UseDisclosureProps,
} from "@chakra-ui/react"
import { RiLock2Fill, RiMailFill } from "react-icons/ri"
import { useAuth } from "../../context/AuthContext"
import { Dialog } from "../Dialog"

interface HeaderAvatarProps {
  showProfileData: boolean
}

export const HeaderAvatar = ({ showProfileData }: HeaderAvatarProps) => {
  const { eu } = useAuth()

  const profileModal = useDisclosure()

  return (
    <Flex
      align="center"
      onClick={() => profileModal.onOpen()}
      cursor="pointer"
      borderRadius={6}
      p={2}
      pl={[0, 6]}
      _hover={{
        transition: "background 0.2s",
        background: "background.200",
      }}
    >
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{eu?.name}</Text>
          <Text color="gray.400" fontSize="small">
            {eu?.email || ""}
          </Text>
        </Box>
      )}

      <Box ml="4">
        <Avatar size="md" name={eu?.name} />
      </Box>

      <ProfileModal {...profileModal} />
    </Flex>
  )
}

const ProfileModal = ({ isOpen, onClose }: UseDisclosureProps) => {
  const { eu } = useAuth()

  return (
    <Dialog isCentered isOpen={isOpen} onClose={onClose}>
      <Box display="flex" my={2} gap={3} alignItems="center">
        <Avatar size="lg" name={eu?.name} />

        <Box display="flex" flexDirection="column" w="100%">
          <Text fontWeight="semibold" fontSize="lg">
            {eu?.name}
          </Text>

          <Box display="flex" gap={1} alignItems="center">
            <Icon as={RiMailFill} fontSize="sm" />
            <Text fontSize="md">{eu?.email}</Text>
          </Box>

          {eu?.isAdmin && (
            <Box display="flex" gap={1} alignItems="center">
              <Icon as={RiLock2Fill} fontSize="sm" color="gray" />
              <Text color="gray" fontSize="sm">
                {"Administrador"}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  )
}
