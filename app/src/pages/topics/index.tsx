import { useRouter } from 'next/router'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image';
import { Button } from '@/components/base'

interface MockTopicProps {
  content: string
  userVote: 'Yes' | 'No' | 'Did not vote'
  status: 'Yes' | 'No' | 'Early request'
  id: string
  created: string
}

export default function AssetScreen() {
  const router = useRouter()

  const MockTopics: MockTopicProps[] = [
    {
      content: '2024/02/25 Will SOL rise to $200?',
      userVote: 'Did not vote',
      status: 'Yes',
      id: 'fhio24oi',
      created: '2024-04-04,21:01'
    },
    {
      content: 'Will interest rates be raised in March?',
      userVote: 'No',
      status: 'No',
      id: 'fhio24oi',
      created: '2024-02-04,11:24'
    },
    {
      content: 'Whether the Bitcoin ETF will pass smoothly?',
      userVote: 'No',
      status: 'Yes',
      id: 'fhio24oi',
      created: '2024-01-06,9:20'
    },
    {
      content: 'Will SoL dip below $150 in 2024 April?',
      userVote: 'Did not vote',
      status: 'Early request',
      id: 'fhio24oi',
      created: '2024-04-02,13:40'
    },
    {
      content: 'Will SOL reach previous high in 2024 March?',
      userVote: 'Did not vote',
      status: 'No',
      id: 'fhio24oi',
      created: '2024-02-04,00:20'
    },
    {
      content: 'TSMC topped 1,000 points in 2024 January?',
      userVote: 'No',
      status: 'No',
      id: 'fhio24oi',
      created: '2024-02-029,21:50'
    }
  ]

  return (
    <div className={'mt-14'}>
      {/* banner */}
      <div className={"w-full"}>
      </div>

      {/* All Steps */}
      <section>
        <div className={'my-2 text-left text-lg font-bold'}>{'I. How it work'}</div>
        <div className={'space-y-4'}>
          <div className={'flex h-12 w-full border-l-4 border-l-second bg-gray-800'}>
            <div className={'flex h-12 w-1/5 items-center bg-gray-700 pl-8  leading-5 text-white'}>
              {'1. Stake Token'}
            </div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'You are staking 0 of your tokens.'}</p>
              <div>
                <button className={'font-bold text-second-light'}>{'Stake/Unstake'}</button>
              </div>
            </div>
          </div>
          <div className={'flex h-12 w-full border-l-4 border-l-second bg-gray-800'}>
            <div className={'flex h-12 w-1/5 items-center bg-gray-700 pl-8  leading-5 text-white'}>{'2. Vote'}</div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'You have voted in 0 votes, and are earning 0% APR.'}</p>
              <div>
                <button className={'font-bold text-second'}>{'Vote history'}</button>
              </div>
            </div>
          </div>
          <div className={'flex h-12 w-full border-l-4 border-l-second bg-gray-800'}>
            <div className={'flex h-12 w-1/5 items-center bg-gray-700 pl-8  leading-5 text-white'}>
              {'3. Get rewards'}
            </div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'Your unclaimed total rewards: 0'}</p>
              <div>
                <button className={'font-bold text-second'}>{'Claim'}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent past votes */}
      <section className={'mt-16'}>
        <div className={'my-2 flex justify-between pr-12 text-left text-lg font-bold'}>
          <p className={'text-xl'}>{'II. Recent past votes:'}</p>
          <div className={'flex w-2/5 justify-between px-4 pl-12 text-primary-hover'}>
            <div className={'w-30'}>{'You vote'}</div>
            <div>{'Topic result'}</div>
            <div>{'Info'}</div>
          </div>
        </div>

        <div className={'space-y-4 overflow-auto'}>
          {MockTopics.map((topic, index) => (
            <div key={index} className={'flex h-20 w-full border-l-4 border-l-primary bg-gray-900 px-4'}>
              <div className={'w-1/9 flex h-20 items-center leading-5 text-white'}>{index + 1}</div>
              <div className={'flex grow items-center justify-between px-8 text-white'}>
                <p>{topic.content}</p>
                <div className={'flex w-2/5 justify-between'}>
                  <div className={'w-32'}>{topic.userVote}</div>
                  <div>{topic.status}</div>
                  <Button
                    className={'flex h-auto gap-0  px-4 text-sm font-bold text-white hover:text-yellow-400'}
                    variant={null}
                    onClick={() => router.push({ pathname: '/topics/info', query: { id: topic.id } })}
                  >
                    <ArrowRight size={32} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
