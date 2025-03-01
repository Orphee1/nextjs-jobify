'use client'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { JobCard } from './components'
import { getAllJobsAction } from '@/utils/actions'

function JobsList() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ('' as string)
  const jobStatus = searchParams.get('jobStatus') || ('' as string)
  const pageNumber = Number(searchParams.get('page')) || 1

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['jobs', search, jobStatus, 1],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  })
  const jobs = data?.jobs || []
  if (isPending) {
    return <h2 className='text-xl'>Please wait...</h2>
  }

  if (jobs.length < 1) {
    return <h2 className='text-xl'>No jobs found</h2>
  }
  return (
    <>
      <div className='grid md:grid-cols-2 gap-8'>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  )
}

export default JobsList
