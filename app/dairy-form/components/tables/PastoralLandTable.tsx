'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FC, useMemo } from 'react'
import { FieldsType, pastoralColumns } from '../formData'
import { TableFields } from './TableFields'
import { FormField } from './DrawerForm'
import { FieldArray, useFormikContext } from 'formik'
import * as yup from 'yup'

const formFields: FormField[] = [
  {
    type: 'text',
    label: 'Land Class',
    name: 'landClass',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Area (Ha)',
    name: 'area',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Value/Ha',
    name: 'valuePerHa',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Value',
    name: 'totalValue',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'MS/Ha',
    name: 'msPerHa',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Total MS',
    name: 'totalMs',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'SU/Ha',
    name: 'suPerHa',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Total SU',
    name: 'totalSu',
    type: 'number',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    type: 'checkbox',
    label: 'In Off',
    name: 'inOff',
    groupClassName: 'grid grid-cols-4 items-center gap-4',
    labelClassName: 'text-right',
    className: 'col-span-3'
  },
  {
    label: 'Description',
    name: 'description',
    type: 'textarea',
    groupClassName: 'grid gap-4'
  }
]

const pastoralLandValidationSchema = yup.object().shape({
  
  landClass: yup.string().required().label('Land Class'),
  area: yup.number().required().label('Area (Ha)'),
  valuePerHa: yup.number().required().label('Value/Ha'),
  totalValue: yup.number().required().label('Total Value'),
  msPerHa: yup.number().required().label('MS/Ha'),
  totalMs: yup.number().required().label('Total MS'),
  suPerHa: yup.number().required().label('SU/Ha'),
  totalSu: yup.number().required().label('Total SU'),
  inOff: yup.boolean().nullable().label('In Off'),
  description: yup.string().required().label('Description')
})

export const PastoralLandTable: FC = () => {
  const formik = useFormikContext<FieldsType>()
  const footerData = useMemo(() => {
    const data = formik.values.pastoral_land || []
    return {
      landClass: 'Total',
      area: data.reduce((acc, row) => acc + row.area, 0),
      valuePerHa: 0, // Replace with calculation if needed
      totalValue: data.reduce((acc, row) => acc + row.totalValue, 0),
      msPerHa: 0, // Replace with calculation if needed
      totalMs: data.reduce((acc, row) => acc + row.totalMs, 0),
      suPerHa: 0, // Replace with calculation if needed
      totalSu: data.reduce((acc, row) => acc + row.totalSu, 0),
      inOff: '',
      description: '',
    }
  }, [formik.values.pastoral_land])


  return (
    <Card>
      <CardHeader className="pb-2">
        <h4 className="font-semibold">Pastoral Land</h4>
      </CardHeader>
      <CardContent className="pt-0">
        <FieldArray name="pastoral_land">
          {(arrayHelpers) => (
             <TableFields
              columns={pastoralColumns}
              data={formik.values.pastoral_land}
              formFields={formFields}
              formFieldsValidationSchema={pastoralLandValidationSchema}
              footerData={footerData} // Pass the calculated footer data here
              onAdd={(row) => arrayHelpers.push(row)}
              onEdit={(index, row) => arrayHelpers.replace(index, row)}
              onDelete={(index) => arrayHelpers.remove(index)}
            />
          )}
        </FieldArray>
      </CardContent>
    </Card>
  )
}

export default PastoralLandTable
