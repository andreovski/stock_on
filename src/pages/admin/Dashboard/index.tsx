import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react"

import Charts from "react-apexcharts"
import { theme } from "../../../styles/theme"

import { onDownloadPdf } from "../../../libs/pdf"
import { useQueryFerramentasSolicitadasGetItems } from "../../../services/api/ferramentasSolicitadas"
import { useCallback, useEffect, useMemo } from "react"
import { supabase } from "../../../services/supabaseClient"

const series = [{ name: "series1", data: [3, 120, 10, 28, 51, 109] }]
const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[600],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: ["21/11", "22/11", "23/11", "24/11", "25/11", "26/11"],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
}

function Dashboard() {
  //TODO: Impressão de relatórios
  // let { data: items } = useQueryFerramentasSolicitadasGetItems(
  //   {},
  //   "number, worker, tools, date"
  // )
  // const data = useMemo(() => {
  //   let body = Object.values(items)

  //   const header = [
  //     "Numero da solicitação",
  //     "Funcionário",
  //     "Ferramentas",
  //     "Data",
  //   ]

  //   return { header, body }
  // }, [items])

  // const { handleDownload } = onDownloadPdf(data)

  return (
    <SimpleGrid flex="1" alignItems="center" justifyContent="center">
      {/* <Button onClick={handleDownload}>Baixar</Button> */}
      <Text>Home</Text>
    </SimpleGrid>
  )
}

export default Dashboard
