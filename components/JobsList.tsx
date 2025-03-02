'use client'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { JobCard } from './components'
import { getAllJobsAction } from '@/utils/actions'
import ButtonContainer from './ComplexButtonContainer'

function JobsList() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ('' as string)
  const jobStatus = searchParams.get('jobStatus') || ('' as string)
  const pageNumber = Number(searchParams.get('page')) || 1

  const { isPending, data } = useQuery({
    queryKey: ['jobs', search ?? '', jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  })
  const jobs = data?.jobs || []
  const count = data?.count || 0
  const page = data?.page || 0
  const totalPages = data?.totalPages || 0

  if (isPending) {
    return <h2 className='text-xl'>Please wait...</h2>
  }

  if (jobs.length < 1) {
    return <h2 className='text-xl'>No jobs found</h2>
  }
  return (
    <>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-xl font-semibold capitalize'>{count} jobs found</h2>
        {totalPages < 2 ? null : (
          <ButtonContainer currentPage={page} totalPages={totalPages} />
        )}
      </div>
      <div className='grid md:grid-cols-2 gap-8'>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  )
}

export default JobsList
