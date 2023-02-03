import { Box, Button, ModalFooter, Text, useToast } from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import React, { useRef } from "react"
import * as Yup from "yup"
import { useQueryClient } from "react-query"
import { Dialog } from "../../../../components/Dialog"
import { InputForm } from "../../../../components/Form/InputForm"
import { useMutationProfilesDeleteProfile } from "../../../../services/api/profiles"

export const UserListDialogDelete = ({ isOpen, onClose, userData }) => {
  const cancelRef = useRef()
  const queryClient = useQueryClient()
  const toast = useToast()

  const validationSchema = Yup.object({
    originalEmail: Yup.string(),
    email: Yup.string().oneOf(
      [Yup.ref("originalEmail"), null],
      "O e-mail digitado não confere"
    ),
  })

  const { mutate: handleDelete, isLoading } = useMutationProfilesDeleteProfile({
    onSuccess: () => {
      queryClient.refetchQueries("ProfilesGetProfiles")
      queryClient.refetchQueries("ProfilesGetProfiles-list")
      toast({
        title: "Solicitação deletada com sucesso.",
        status: "success",
      })
    },
  })

  const onDelete = () => {
    handleDelete({ id: userData.id })
  }

  const initialValues = {
    originalEmail: userData.email,
  }

  return (
    <Dialog
      header="Confirme a deleção do usuário"
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <Formik
        onSubmit={onDelete}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <Box padding={2} display="flex" flexDir="column" gap={8}>
            <Text lineHeight={6}>
              Digite o e-mail <b>{userData.email}</b> abaixo para confirmar a
              deleção do usuário <b>{userData.name}</b>.
            </Text>
            <Box display="flex" flexDir="column" gap={2}>
              <Field
                name="email"
                placeholder="Confirme o e-mail acima"
                isDefault
                onPaste={(e) => e.preventDefault()}
                component={InputForm}
              />
              <Text fontSize="sm" color="gray">
                Essa ação é irreversivel e o usuário não poderá ser restaurado.
              </Text>
            </Box>

            <ModalFooter gap={2} paddingInline={0}>
              <Button
                variant="ghost"
                ref={cancelRef}
                onClick={onClose}
                isLoading={isLoading}
              >
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                type="submit"
                isLoading={isLoading}
              >
                Apagar usuário
              </Button>
            </ModalFooter>
          </Box>
        </Form>
      </Formik>
    </Dialog>
  )
}
