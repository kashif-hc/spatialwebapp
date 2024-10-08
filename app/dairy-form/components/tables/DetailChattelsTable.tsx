'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { detailChattelsColumns, FieldsType } from '../formData'
import { TableFields } from './TableFields'
import { FormField } from './DrawerForm'
import { FieldArray, useFormikContext } from 'formik'
import * as yup from 'yup'
import { useMemo } from 'react'

const formFields: FormField[] = [
  {
    label: 'Item',
    name: 'item',
    type: 'text',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'unit',
    name: 'unit',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Rate',
    name: 'rate',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Value',
    name: 'value',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3',
    disabled: true,
    placeholder: 'This field is automatically calculated on submission.'
  },
  {
    label: 'Description',
    name: 'description',
    type: 'textarea',
    groupClassName: 'grid gap-4'
  }
]

const detailChattelsValidationSchema = yup.object().shape({
  item: yup.string().required().label('Item'),
  unit: yup.number().required().label('Unit'),
  rate: yup.number().required().label('Rate'),
  value: yup.number().nullable().label('Value'),
  description: yup.string().required().label('Description')
})

export const DetailChattelsTable = () => {
  const formik = useFormikContext<FieldsType>()
  const footerData = useMemo(() => {
    const data = formik.values.detail_chattels_data || []
    return {
      id: '',
      item: 'Total',
      unit: 0,
      ratePerUnit: 0,
      value: data.reduce((acc, row) => acc + row.value, 0),
      description: ''
    }
  }, [formik.values.detail_chattels_data])

  return (
    <Card>
      <CardHeader className="pb-2">
        <h4 className="font-semibold">Detail Chattels</h4>
      </CardHeader>
      <CardContent className="pt-0">
        <FieldArray name="detail_chattels_data">
          {(arrayHelpers) => (
            <TableFields
              columns={detailChattelsColumns}
              data={formik.values.detail_chattels_data}
              formFields={formFields}
              formFieldsValidationSchema={detailChattelsValidationSchema}
              footerData={footerData}
              onAdd={(row) => {
                const calculatedRow = { ...row }
                calculatedRow.value = row.unit * row.ratePerUnit
                arrayHelpers.push(row)
              }}
              onEdit={(index, row) => {
                const calculatedRow = { ...row }
                calculatedRow.value = row.unit * row.ratePerUnit
                arrayHelpers.replace(index, row)
              }}
              onDelete={(index) => arrayHelpers.remove(index)}
            />
          )}
        </FieldArray>
      </CardContent>
    </Card>
  )
}

export default DetailChattelsTable
