import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { deleteJobAction } from '@/utils/actions'

function DeleteJobBtn({ id }: { id: string }) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast('There was an error...')
        return
      }
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      queryClient.invalidateQueries({ queryKey: ['stats'] })
      queryClient.invalidateQueries({ queryKey: ['charts'] })

      toast('Job removed !')
    },
  })

  return (
    <Button size='sm' disabled={isPending} onClick={() => mutate(id)}>
      {isPending ? 'Pending...' : 'Delete'}
    </Button>
  )
}

export default DeleteJobBtn
