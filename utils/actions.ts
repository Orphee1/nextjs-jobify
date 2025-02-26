'use server'

import prisma from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from './types'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'

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
