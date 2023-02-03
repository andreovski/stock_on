import { Stack, Text } from "@chakra-ui/react"
import {
  RiArchiveLine,
  RiContactsLine,
  RiDashboardLine,
  RiGroupLine,
  RiToolsLine,
} from "react-icons/ri"

import { SidebarNavSection } from "./SidebarNavSection"
import { SidebarNavLink } from "./SidebarNavLink"
import { useAuth } from "../../context/AuthContext"

export function SidebarNav() {
  const { eu } = useAuth()

  return (
    <Stack spacing="12" align="flex-start">
      <SidebarNavSection title="GERAL">
        <SidebarNavLink link="/dashboard" icon={RiDashboardLine}>
          <Text ml="4" fontWeight="medium">
            Dashboard
          </Text>
        </SidebarNavLink>
      </SidebarNavSection>

      <SidebarNavSection title="CADASTROS">
        <SidebarNavLink link="workers" icon={RiContactsLine}>
          <Text ml="4" fontWeight="medium">
            Funcionários
          </Text>
        </SidebarNavLink>
        <SidebarNavLink link="stock" icon={RiArchiveLine}>
          <Text ml="4" fontWeight="medium">
            Estoque
          </Text>
        </SidebarNavLink>
      </SidebarNavSection>

      <SidebarNavSection title="FLUXOS">
        <SidebarNavLink link="ferramentas-solicitadas" icon={RiToolsLine}>
          <Text ml="4" fontWeight="medium">
            Ferramentas solicitadas
          </Text>
        </SidebarNavLink>
      </SidebarNavSection>

      {eu.isAdmin && (
        <SidebarNavSection title="CONFIGURAÇÕES">
          <SidebarNavLink link="usuarios" icon={RiGroupLine}>
            <Text ml="4" fontWeight="medium">
              Usuários
            </Text>
          </SidebarNavLink>
        </SidebarNavSection>
      )}
    </Stack>
  )
}
