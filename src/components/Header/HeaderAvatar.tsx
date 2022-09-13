import { Avatar, Box, Flex, Text } from "@chakra-ui/react"
import { useAuth } from "../../context/AuthContext"

interface HeaderAvatarProps {
  showProfileData: boolean
}

export const HeaderAvatar = ({ showProfileData }: HeaderAvatarProps) => {
  const { eu } = useAuth()

  return (
    <Flex align="center">
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
    </Flex>
  )
}
