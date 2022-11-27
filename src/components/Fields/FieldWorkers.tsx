import React from "react"
import { Field } from "formik"
import { useQueryWorkersGetWorkers } from "../../services/api/workers"

export const FieldWorkers = ({ name, ...props }) => {
  const { data } = useQueryWorkersGetWorkers()

  const options = data.map((val) => ({
    label: val.name,
    value: val,
  }))

  return <Field name={name} type="select" options={options} {...props} />
}
