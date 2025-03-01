'use server'

import prisma from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from './types'
import { redirect } from 'next/navigation'
import { Prisma } from '@prisma/client'

async function authenticateRedirect(): Promise<string> {
  const { userId } = await auth()
  if (!userId) redirect('/')
  return userId
}

export async function createJobAction(
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = await authenticateRedirect()
  try {
    createAndEditJobSchema.parse(values) // to check the values server side too
    const job: JobType = await prisma.job.create({
      data: {
        ...values,
        clerkId: userId,
      },
    })
    return job
  } catch (error) {
    console.log(error)
    return null
  }
}

type GetAllJobsActionTypes = {
  search?: string
  jobStatus?: string
  page?: number
  limit?: number
}

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes): Promise<{
  jobs: JobType[]
  count: number
  page: number
  totalPages: number
}> {
  const userId = await authenticateRedirect()
  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    }
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
            },
          },
          {
            company: {
              contains: search,
            },
          },
        ],
      }
    }
    if (jobStatus && jobStatus !== 'all') {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      }
    }
    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return { jobs, count: 0, page: 1, totalPages: 0 }
  } catch (error) {
    console.log(error)
    return { jobs: [], count: 0, page: 1, totalPages: 0 }
  }
}

export async function getSingleJobAction(id: string): Promise<JobType | null> {
  let job: JobType | null = null
  const userId = await authenticateRedirect()
  try {
    job = await prisma.job.findUnique({
      where: {
        id: id,
        clerkId: userId,
      },
    })
  } catch (error) {
    console.log(error)
    job = null
  }
  if (!job) {
    redirect('/jobs')
  }
  return job
}

export async function deleteJobAction(id: string): Promise<JobType | null> {
  const userId = await authenticateRedirect()
  try {
    const job: JobType = await prisma.job.delete({
      where: {
        id: id,
        clerkId: userId,
      },
    })

    return job
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function updateJobAction(
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = await authenticateRedirect()
  try {
    const job = await prisma.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    })
    return job
  } catch (error) {
    return null
  }
}
