import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button, FormInput } from '@/components/base'
import { Column, Table, TableSkeleton } from '@/components/base/Table'

type TopicInput = {
  topicName: string
}

const defaultValues: TopicInput = {
  topicName: ''
}

interface InputData {
  number: number
  name: string
  type: string
  data: string
}

export default function AssetScreen() {
  const {
    control,
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting }
  } = useForm<TopicInput>({
    defaultValues
  })

  const [isLoading, setIsLoading] = useState(false)

  const onCreate = () => {
    try {
      // TODO call contact api
      setIsLoading(true)
      console.log(watch('topicName'))
    } catch (e) {
      e instanceof Error && console.log(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  const columns = useMemo(() => {
    return [
      {
        key: 'number',
        header: () => <p>{'#'}</p>,
        cell: (item) => <p>{item.number}</p>
      },
      {
        key: 'name',
        header: () => <p>{'Name'}</p>,
        cell: (item) => <p>{item.name}</p>
      },
      {
        key: 'type',
        header: () => <p>{'Type'}</p>,
        cell: (item) => <p>{item.type}</p>
      },
      {
        key: 'data',
        header: () => <p>{'Data'}</p>,
        cell: (item) => <p>{item.data}</p>
      }
    ] satisfies Column<InputData>[]
  }, [])

  const list: InputData[] = useMemo(() => {
    return [
      {
        number: 1,
        name: 'Request',
        type: 'bytes',
        data: 'RequestData' //TODO
      },
      {
        number: 2,
        name: 'requester',
        type: 'address',
        data: 'requesterData' //TODO
      },
      {
        number: 3,
        name: 'identifier',
        type: 'bytes32',
        data: 'identifier' //TODO
      },
      {
        number: 4,
        name: 'request timestamp',
        type: 'unit256',
        data: 'Time' //TODO
      },
      {
        number: 5,
        name: 'ancilaryData',
        type: 'string',
        data: 'ancilaryData - string (Question)' //TODO
      },
      {
        number: 6,
        name: 'ancilaryData',
        type: 'bytes',
        data: 'ancilaryData - bytes' //TODO
      },
      ,
      {
        number: 7,
        name: 'RealitySyncIp',
        type: 'string',
        data: 'OurIPLink' //TODO
      }
    ].filter((data) => data !== undefined) as InputData[]
  }, [])

  return (
    <div className={'mx-auto mt-8 w-2/3 space-y-4'}>
      <form onSubmit={handleSubmit(onCreate)}>
        <div className={'space-y-4 rounded bg-slate-800 px-8 py-4'}>
          <div className={'text-start font-bold'}>{'Topic Propose'}</div>
          <div className={'flex space-x-4 '}>
            <FormInput
              control={control}
              className={'h-8 grow text-black'}
              name={'topicName'}
              placeholder={'Topic description...'}
            />
            <Button
              className={'relative border hover:bg-slate-600'}
              variant={null}
              type={'submit'}
              disabled={isSubmitting}
            >
              <span className={''}>{'Create Topic'}</span>
            </Button>
          </div>
        </div>
      </form>

      <div className={'w-full rounded bg-slate-800 px-8 py-4'}>
        <div className={'text-start font-bold'}>{'Topic Propose'}</div>
        {isLoading ? (
          <TableSkeleton columns={columns} length={15} hasDropdown={true} />
        ) : (
          <Table columns={columns} className={'text-black'} data={list!} />
        )}
      </div>
    </div>
  )
}
