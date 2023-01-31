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
  ModalProps,
} from "@chakra-ui/react"

type DialogType = UseDisclosureProps &
  ModalProps & {
    header?: string | React.ReactNode
    children: string | React.ReactNode
    footer?: React.ReactNode
    footerProps?: Component<typeof ModalFooter>
  }

export const Dialog = ({
  isOpen,
  onClose,
  header,
  children,
  footer,
  footerProps,
  ...props
}: DialogType) => {
  return (
    <Modal isOpen={isOpen!} onClose={onClose!} {...props}>
      <ModalOverlay>
        <ModalContent>
          {header && <ModalHeader>{header}</ModalHeader>}
          <ModalCloseButton />

          <ModalBody>{children}</ModalBody>

          {footer && (
            <ModalFooter gap={2} {...footerProps}>
              {footer}
            </ModalFooter>
          )}
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}
