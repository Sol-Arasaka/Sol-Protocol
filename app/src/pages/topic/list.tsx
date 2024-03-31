export default function AssetScreen() {
  return (
    <>
      {/* banner */}
      <section></section>

      {/* All Steps */}
      <section>
        <div>{'How it work'}</div>
        <div className={'space-y-4'}>
          <div className={'flex h-8 w-full bg-gray-500'}>
            <div className={'flex h-8 w-1/5 items-center bg-black pl-8  leading-5 text-white'}>{'1'}</div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'content'}</p>
              <div>
                <button className={'text-red-400'}>{'link'}</button>
              </div>
            </div>
          </div>
          <div className={'flex h-8 w-full bg-gray-500'}>
            <div className={'flex h-8 w-1/5 items-center bg-black pl-8  leading-5 text-white'}>{'2'}</div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'content'}</p>
              <div>
                <button className={'text-red-400'}>{'link'}</button>
              </div>
            </div>
          </div>
          <div className={'flex h-8 w-full bg-gray-500'}>
            <div className={'flex h-8 w-1/5 items-center bg-black pl-8  leading-5 text-white'}>{'3'}</div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'content'}</p>
              <div>
                <button className={'text-red-400'}>{'link'}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent past votes */}
      <section className={'mt-16 bg-slate-300'}>
        <div>{'Recent past votes:'}</div>
        <div className={'space-y-4'}>
          <div className={'flex h-8 w-full bg-gray-500'}>
            <div className={'flex h-8 w-1/5 items-center bg-black pl-8  leading-5 text-white'}>{'1'}</div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'content'}</p>
              <div>
                <button className={'text-red-400'}>{'link'}</button>
              </div>
            </div>
          </div>
          <div className={'flex h-8 w-full bg-gray-500'}>
            <div className={'flex h-8 w-1/5 items-center bg-black pl-8  leading-5 text-white'}>{'2'}</div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'content'}</p>
              <div>
                <button className={'text-red-400'}>{'link'}</button>
              </div>
            </div>
          </div>
          <div className={'flex h-8 w-full bg-gray-500'}>
            <div className={'flex h-8 w-1/5 items-center bg-black pl-8  leading-5 text-white'}>{'3'}</div>
            <div className={'flex grow items-center justify-between px-8 text-white'}>
              <p>{'content'}</p>
              <div>
                <button className={'text-red-400'}>{'link'}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
