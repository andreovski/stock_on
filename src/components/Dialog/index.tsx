import React, { Component } from "react"
import {
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureProps,
} from "@chakra-ui/react"

type DialogType = UseDisclosureProps & {
  header: string | React.ReactNode
  children: string | React.ReactNode
  footer: React.ReactNode
  footerProps?: Component<typeof ModalFooter>
}

export const Dialog = ({
  isOpen,
  onClose,
  header,
  children,
  footer,
  footerProps,
}: DialogType) => {
  return (
    <Modal isOpen={isOpen!} onClose={onClose!}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>{header}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>{children}</ModalBody>

          <ModalFooter gap={2} {...footerProps}>
            {footer}
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}
