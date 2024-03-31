import { Icon } from '@/components/base'

export default function Home() {
  return (
    <main className={'flex h-screen w-screen items-center justify-center bg-background'}>
      <Icon name={'Loading'} className={'animate-spin stroke-primary'} size={32} />
    </main>
  )
}
