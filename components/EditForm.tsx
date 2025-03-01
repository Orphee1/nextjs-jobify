'use client'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from '@/utils/types'
import { Button } from './ui/button'
import { Form } from './ui/form'
import { CustomFormField, CustomFormSelect } from './FormComponent'
import { getSingleJobAction, updateJobAction } from '@/utils/actions'

function EditForm({ jobId }: { jobId: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) =>
      updateJobAction(jobId, values),
    onSuccess: (data) => {
      if (!data) {
        toast('There was an error.')
        return
      }
      toast('Job updated !')
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      queryClient.invalidateQueries({ queryKey: ['job', jobId] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      router.push('/jobs')
    },
  })
  const { data } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getSingleJobAction(jobId),
  })
  // const router = useRouter()
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: data?.position || '',
      company: data?.company || '',
      location: data?.location || '',
      status: (data?.status as JobStatus) || JobStatus.Pending,
      mode: (data?.mode as JobMode) || JobMode.FullTime,
    },
  })

  function handleSubmit(values: CreateAndEditJobType) {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='bg-muted rounded p-8'
      >
        <h2 className='capitalize font-semibold text-4xl mb-6'>edit job</h2>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start'>
          <CustomFormField name='position' control={form.control} />
          <CustomFormField name='location' control={form.control} />
          <CustomFormField name='company' control={form.control} />
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
          <Button
            type='submit'
            className='self-end capitalize'
            disabled={isPending}
          >
            {isPending ? 'updating...' : 'edit job'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditForm
