import Image from 'next/image'

export default function Home() {
  return (
    <div className={' -mt-8 flex h-full flex-col items-center justify-center'}>
      <div className={'overflow-auto rounded-xl'}>
        <Image src={'/images/banner2.jpg'} alt={'Logo'} width={1024} height={579} />
      </div>

      <div className={'mt-5 text-2xl font-bold text-second-light'}>{'RealitySync'}</div>
      <div className={'mt-2'}>{'Well-planned infrastructure is the bedrock of progress and prosperity.'}</div>
    </div>
  )
}
