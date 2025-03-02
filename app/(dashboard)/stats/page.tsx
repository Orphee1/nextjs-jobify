import {
  dehydrate,
  QueryClient,
  HydrationBoundary,
} from '@tanstack/react-query'
import { getStatsAction, getChartDataAction } from '@/utils/actions'
import { ChartContainer, StatsContainer } from '@/components/components'

export default async function StatsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['stats'],
    queryFn: () => getStatsAction(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['charts'],
    queryFn: () => getChartDataAction(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsContainer />
      <ChartContainer />
    </HydrationBoundary>
  )
}
