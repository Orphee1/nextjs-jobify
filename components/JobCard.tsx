import Link from 'next/link'
import { Briefcase, CalendarDays, MapPin, RadioTower } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { JobInfo, DeleteJobBtn } from './components'

import { JobType } from '@/utils/types'

export default function JobCard({ job }: { job: JobType }) {
  const date = new Date(job.createdAt).toLocaleDateString()

  return (
    <Card className='bg-muted'>
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className='mt-4 grid grid-cols-2 gap-4'>
        <JobInfo icon={<Briefcase />} text={job.mode} />
        <JobInfo icon={<MapPin />} text={job.location} />
        <JobInfo icon={<CalendarDays />} text={date} />
        <Badge className='flex w-32 justify-center'>
          <JobInfo
            icon={<RadioTower className='w-4 h-4' />}
            text={job.status}
          />
        </Badge>
      </CardContent>
      <CardFooter className='flex gap-4'>
        <Button asChild size='sm'>
          <Link href={`/jobs/${job.id}`}>edit</Link>
        </Button>
        <DeleteJobBtn id={job.id} />
      </CardFooter>
    </Card>
  )
}
