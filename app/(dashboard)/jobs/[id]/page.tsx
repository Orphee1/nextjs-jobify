import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query'

import { EditForm } from '@/components/components'
import { getSingleJobAction } from '@/utils/actions'

async function SingleJobPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['job', id],
    queryFn: () => getSingleJobAction(id),
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditForm jobId={id} />
    </HydrationBoundary>
  )
}

export default SingleJobPage
