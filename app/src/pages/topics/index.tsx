export default function AssetScreen() {
  return (
    <div className={'mt-14'}>
      {/* banner */}
      <section></section>

      {/* All Steps */}
      <section>
        <div className={'text-left font-bold'}>{'How it work'}</div>
        <div className={'space-y-4'}>
          <div className={'flex h-12 w-full border-l-4 border-l-second bg-gray-500'}>
            <div className={'flex h-12 w-1/5 items-center bg-black pl-8  leading-5 text-white'}>{'1. Stake UMA'}</div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'You are staking 0 of your 0 UMA tokens.'}</p>
              <div>
                <button className={'font-bold text-red-400'}>{'Stake/Unstake'}</button>
              </div>
            </div>
          </div>
          <div className={'flex h-12 w-full border-l-4 border-l-second bg-gray-700'}>
            <div className={'flex h-12 w-1/5 items-center bg-black pl-8  leading-5 text-white'}>{'2. Vote'}</div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'You have voted in 0 votes, and are earning 0% APR.'}</p>
              <div>
                <button className={'font-bold text-red-400'}>{'Vote history'}</button>
              </div>
            </div>
          </div>
          <div className={'flex h-12 w-full border-l-4 border-l-second bg-gray-500'}>
            <div className={'flex h-12 w-1/5 items-center bg-black pl-8  leading-5 text-white'}>{'3. Get rewards'}</div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'Your unclaimed UMA rewards: 0'}</p>
              <div>
                <button className={'font-bold text-red-400'}>{'Claim'}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent past votes */}
      <section className={'mt-16'}>
        <div className={'text-left font-bold'}>{'Recent past votes:'}</div>
        <div className={'space-y-4 overflow-auto'}>
          <div className={'flex h-20 w-full border-l-4 border-l-primary bg-gray-900 px-4'}>
            <div className={'w-1/9 flex h-20 items-center leading-5 text-white'}>{'1'}</div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'content'}</p>
              <div className={"flex w-2/3 justify-between"}>
                <div>{"You vote"}</div>
                <div>{"Vote Status"}</div>
                <button className={'text-lg font-bold text-yellow-500'}>{'link'}</button>
              </div>
            </div>
          </div>
          <div className={'flex h-20 w-full border-l-4 border-l-primary bg-gray-900 px-4'}>
            <div className={'w-1/9 flex h-20 items-center leading-5 text-white'}>{'2'}</div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'content'}</p>
              <div className={"flex w-2/3 justify-between"}>
                <div>{"You vote"}</div>
                <div>{"Vote Status"}</div>
                <button className={'text-lg font-bold text-yellow-500'}>{'link'}</button>
              </div>
            </div>
          </div>
          <div className={'flex h-20 w-full border-l-4 border-l-primary bg-gray-900 px-4'}>
            <div className={'w-1/9 flex h-20 items-center leading-5 text-white'}>{'3'}</div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'content'}</p>
              <div className={"flex w-2/3 justify-between"}>
                <div>{"You vote"}</div>
                <div>{"Vote Status"}</div>
                <button className={'text-lg font-bold text-yellow-500'}>{'link'}</button>
              </div>
            </div>
          </div>
          <div className={'flex h-20 w-full border-l-4 border-l-primary bg-gray-900 px-4'}>
            <div className={'w-1/9 flex h-20 items-center leading-5 text-white'}>{'4'}</div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'content'}</p>
              <div className={"flex w-2/3 justify-between"}>
                <div>{"You vote"}</div>
                <div>{"Vote Status"}</div>
                <button className={'text-lg font-bold text-yellow-500'}>{'link'}</button>
              </div>
            </div>
          </div>
          <div className={'flex h-20 w-full border-l-4 border-l-primary bg-gray-900 px-4'}>
            <div className={'w-1/9 flex h-20 items-center leading-5 text-white'}>{'5'}</div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'content'}</p>
              <div className={"flex w-2/3 justify-between"}>
                <div>{"You vote"}</div>
                <div>{"Vote Status"}</div>
                <button className={'text-lg font-bold text-yellow-500'}>{'link'}</button>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  )
}
