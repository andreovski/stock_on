import React from "react"
import { Field } from "formik"
import { useQueryStockGetItems } from "../../services/api/index"

export const FieldToolsMultiselect = ({ name, ...props }) => {
  const { data = [] } = useQueryStockGetItems()

  const options = data.map((val) => ({
    label: val.name,
    value: val,
  }))

  return (
    <Field name={name} type="select" isMulti options={options} {...props} />
  )
}
