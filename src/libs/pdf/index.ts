import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
import { TDocumentDefinitions } from "pdfmake/interfaces"

type IGeneratePDF = {
  data: {
    header: string[]
    body: any[]
  }
}

const generatePDF = async ({ data }) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs

  const docDefinitions: TDocumentDefinitions = {
    content: [
      {
        table: {
          body: [...data.header, ...data.body],
        },
      },
    ],
  }

  return pdfMake.createPdf(docDefinitions)
}

export const onDownloadPdf = (data) => {
  const handleDownload = async () => {
    const pdf = await generatePDF({ data })

    pdf.open()
  }

  return { handleDownload }
}
