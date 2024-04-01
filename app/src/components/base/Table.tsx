import { useSearchParams } from 'next/navigation'
import { FileQuestionIcon } from 'lucide-react'

import { cn } from '@/utils/classnames'

export interface Column<T> {
  key: keyof T & string
  header?: () => JSX.Element
  cell: (item: T, index: number) => JSX.Element
  className?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  className?: string
}

export function Table<T>({ columns, data, className }: TableProps<T>): JSX.Element {
  const searchParams = useSearchParams()
  const sort = searchParams.get('sort') ?? ''
  const order = searchParams.get('order') ?? 'asc'

  return (
    <div className={cn('overflow-y-auto rounded bg-gray-100 p-4 shadow-sm', className)}>
      <div className={'flex w-full flex-col text-xs'} role={'table'}>
        <div className={'flex'} role={'row'}>
          {/* Headers */}
          {columns.map((col) => (
            <div
              key={`header_${col.key}`}
              className={cn(
                'flex h-12 w-[120px] min-w-0 items-center p-2 text-sm font-light text-gray-500 first:w-10 last:flex-1',
                col.className
              )}
              role={'columnheader'}
            >
              {col.header && col.header()}
            </div>
          ))}
        </div>
        <div className={'border-grey flex flex-col rounded border bg-white'} role={'rowgroup'}>
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <div
                key={`row_${rowIndex}`}
                className={'border-grey hover:bg-grey/10 flex border-t transition-colors '}
                role={'row'}
              >
                {/* Cells */}
                {columns.map((col, columnIndex) => (
                  <div
                    key={`cell_${rowIndex}_${columnIndex}`}
                    className={cn(
                      'flex h-12 w-[120px] min-w-0 items-center p-2 text-start first:w-10 last:flex-1',
                      col.className
                    )}
                    role={'cell'}
                  >
                    {col.cell(item, columnIndex)}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className={'flex h-48 items-center justify-center px-2'} role={'cell'} aria-colspan={columns.length}>
              <div className={'text-grey flex flex-col items-center gap-2'}>
                <FileQuestionIcon size={32} />
                <span className={'text-base'}>{'NoData'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface TableSkeletonProps {
  columns: Column<any>[]
  className?: string
  length?: number
  hasDropdown?: boolean
}

export function TableSkeleton({ columns, className, length = 15, hasDropdown }: TableSkeletonProps) {
  return (
    <div className={cn('overflow-y-auto rounded bg-gray-100 p-4', className)}>
      <div className={'flex w-full flex-col text-xs'} role={'table'}>
        <div className={'flex'} role={'row'}>
          {columns.map((col) => (
            <div
              key={`header_${col.key}`}
              className={cn('flex h-12 flex-1 items-center px-2 text-sm font-light text-gray-500', col.className)}
              role={'columnheader'}
            >
              {col.header && col.header()}
            </div>
          ))}
          {/* Dropdown Menu */}
          {hasDropdown && <div className={'size-12 px-2'} role={'columnheader'} />}
        </div>
        <div className={'border-grey flex flex-col rounded border bg-white'} role={'rowgroup'}>
          {Array.from({ length }, (_, rowIndex) => (
            <div
              key={`row_${rowIndex}`}
              className={'border-grey hover:bg-grey/10 flex border-t transition-colors first:border-t-0'}
              role={'row'}
            >
              {columns.map((col, columnIndex) => (
                <div
                  key={`cell_${rowIndex}_${columnIndex}`}
                  className={cn('flex h-12 min-w-0 flex-1 items-center p-2', col.className)}
                  role={'cell'}
                >
                  <div className={'bg-grey/20 h-[40px] w-full animate-pulse rounded'} />
                </div>
              ))}
              {hasDropdown && (
                <div className={'flex size-12 items-center px-2'} role={'cell'}>
                  <div className={'bg-grey/20 h-[40px] w-full animate-pulse rounded'} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
