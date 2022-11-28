import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react"
import React, { useRef } from "react"

export const DeleteDialog = ({ isOpen, onClose, onDelete, title, content }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cancelRef = useRef()

  return (
    <AlertDialog
      motionPreset="scale"
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{content}</AlertDialogBody>

          <AlertDialogFooter>
            <Button variant="ghost" ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={() => [onClose(), onDelete()]}
              ml={3}
            >
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
