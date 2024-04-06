import { Button, Input } from '@/components/base'

export default function info() {
  return (
    <div className={'mx-auto mb-10 mt-8 w-2/3 space-y-4'}>
      <div className={'space-y-4 rounded bg-slate-800 px-8 py-4'}>
        <div className={'text-start font-bold'}>{'I. Propose'}</div>
        <div className={'text-2xl font-bold text-second'}>{'2024/02/25 Will SOL rise to $200?'}</div>
        <div className={'flex justify-between'}>
          <div className={'text-right text-gray-500'}>{'Created: 2024-04-04,21:01'}</div>
          <div className={'text-right text-gray-400'}>{'The event ends at: 2024-04-08,21:01'}</div>
        </div>
      </div>
      <div className={'space-y-4 rounded bg-slate-800 px-8 py-4'}>
        <div className={'text-start font-bold'}>{'II. Vote'}</div>

        <div className={'mx-auto max-w-lg space-y-4'}>
          <div className={'mb-2 flex overflow-hidden rounded-full'}>
            <div className={'flex h-8 w-4/5 items-center justify-center bg-primary-light'}>
              <div className={'flex h-full items-center text-center font-bold text-white'}>{'80%'}</div>
            </div>
            <div className={'flex h-8 w-1/5 justify-center bg-second-light'}>
              <div className={'flex h-full items-center text-center font-bold text-white'}>{'20%'}</div>
            </div>
          </div>
          <div className={'flex space-x-4'}>
            <Button
              className={
                'relative flex-1 border-2 border-primary-light text-primary-light hover:bg-primary-light hover:text-white '
              }
              variant={null}
            >
              {'Yes'}
            </Button>
            <Button
              className={
                'relative flex-1 border-2 border-second-light text-second-light hover:bg-second-light hover:text-white'
              }
              variant={null}
            >
              {'No'}
            </Button>
          </div>
          <div className={'font-bold text-red-400'}>{'Attention: Voting has ended!'}</div>

          <div className={'flex'}>
            <Button
              className={
                'relative flex-1 border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white '
              }
              variant={null}
            >
              {'Claim your reward !'}
            </Button>
          </div>
        </div>
      </div>
      <div className={'space-y-4 rounded bg-slate-800 px-8 py-4'}>
        <div className={'text-start font-bold'}>{'III. Forum'}</div>
        <div className={'text-start font-bold'}>
          <div className={'mx-auto max-w-xl'}>
            <div className={'mb-4 space-y-4'}>
              <div className={'mb-2 flex'}>
                <div>
                  <div className={'size-8 rounded-full bg-second'}></div>
                  <p className={'mt-2 text-center text-xs text-gray-400'}>{'user1'}</p>
                </div>
                <div className={'ml-2 h-1/2 rounded-lg bg-gray-600 p-3'}>
                  <p className={'text-xs text-white'}>
                    {
                      'Hey, do you guys remember when we were talking about SOL possibly reaching $200 by February 25th?'
                    }
                  </p>
                </div>
              </div>
              <div className={'mb-2 flex'}>
                <div>
                  <div className={'size-8 rounded-full bg-second'}></div>
                  <p className={'mt-2 text-center text-xs text-gray-400'}>{'user2'}</p>
                </div>
                <div className={'ml-2 h-1/2 rounded-lg bg-gray-600 p-3'}>
                  <p className={'text-xs text-white'}>
                    {'Yeah, I remember. It seemed like quite a stretch at the time.'}
                  </p>
                </div>
              </div>
              <div className={'mb-2 flex justify-end'}>
                <div className={'mr-2 h-1/2 rounded-lg bg-primary-hover p-3 text-white'}>
                  <p className={'text-xs'}>{'Actually, it happened! SOL crossed the $200 mark on February 25th.'}</p>
                </div>
                <div>
                  <div className={'size-8 rounded-full bg-primary'}></div>
                  <p className={'mt-2 text-center text-xs text-gray-400'}>{'you'}</p>
                </div>
              </div>
              <div className={'mb-2 flex'}>
                <div>
                  <div className={'size-8 rounded-full bg-second'}></div>
                  <p className={'mt-2 text-center text-xs text-gray-400'}>{'user2'}</p>
                </div>
                <div className={'ml-2 h-1/2 rounded-lg bg-gray-600 p-3'}>
                  <p className={'text-xs text-white'}>
                    {"It's incredible, isn't it? SOL's been making some serious moves lately."}
                  </p>
                </div>
              </div>

              <div className={'mb-2 flex justify-end'}>
                <div className={'mr-2 h-1/2 rounded-lg bg-primary-hover p-3 text-white'}>
                  <p className={'text-xs'}>{'Absolutely, the crypto market never fails to surprise us.'}</p>
                </div>
                <div>
                  <div className={'size-8 rounded-full bg-primary'}></div>
                  <p className={'mt-2 text-center text-xs text-gray-400'}>{'you'}</p>
                </div>
              </div>
            </div>
            <div className={'mb-2 flex'}>
              <div>
                <div className={'size-8 rounded-full bg-second'}></div>
                <p className={'mt-2 text-center text-xs text-gray-400'}>{'user2'}</p>
              </div>
              <div className={'ml-2 h-1/2 rounded-lg bg-gray-600 p-3'}>
                <p className={'text-xs text-white'}>{"True, SOL's rise just proves how unpredictable it can be."}</p>
              </div>
            </div>
            <div className={'mb-5 mt-4 flex'}>
              <Input
                type={'text'}
                placeholder={'Enter message'}
                className={
                  'mr-2 flex-1 appearance-none rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none'
                }
              />
              <button
                className={
                  'rounded-md bg-primary px-4 py-2 text-xs text-white hover:bg-primary-light focus:bg-primary focus:outline-none'
                }
              >
                {'submit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
