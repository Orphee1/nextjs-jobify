'use client'
import { useQuery } from '@tanstack/react-query'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { getChartDataAction } from '@/utils/actions'

function ChartContainer() {
  const { data, isPending } = useQuery({
    queryKey: ['charts'],
    queryFn: () => getChartDataAction(),
  })

  console.log(data)

  if (isPending) {
    return <h2 className='text-center py-6'>Data loading...</h2>
  }
  if (!data || data.length < 1) {
    return null
  }

  return (
    <section className='mt-16'>
      <h1 className='text-4xl font-semibold text-center'>
        Monthly applications
      </h1>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis allowDecimals={false} />
          <Tooltip contentStyle={{ color: '	#e11d48' }} />
          <Bar dataKey='count' fill='	#e11d48' barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}

export default ChartContainer
