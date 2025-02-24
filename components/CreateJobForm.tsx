'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  JobMode,
  JobStatus,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from '@/utils/types'

import { formSchema } from '@/utils/types'
import { Button } from './ui/button'
import { Form } from '@/components/ui/form'

import { CustomFormField, CustomFormSelect } from './FormComponent'

function CreateJobForm() {
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    },
  })

  function onSubmit(values: CreateAndEditJobType) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='bg-muted rounded p-8'
      >
        <h2 className='capitalize font-semibold text-4xl mb-6  '>add job</h2>
        <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-3 items-start'>
          <CustomFormField name='position' control={form.control} />
          <CustomFormField name='company' control={form.control} />
          <CustomFormField name='location' control={form.control} />
          <CustomFormSelect
            name='status'
            control={form.control}
            labelText='Job status'
            items={Object.values(JobStatus)}
          />
          <CustomFormSelect
            name='mode'
            control={form.control}
            labelText='Job mode'
            items={Object.values(JobMode)}
          />
          <Button type='submit' className='self-end capitalize'>
            add job
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateJobForm
