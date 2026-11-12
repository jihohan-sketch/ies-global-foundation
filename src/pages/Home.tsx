import { Hero } from '@/components/home/Hero'
import { Purpose } from '@/components/home/Purpose'
import { Branches } from '@/components/home/Branches'
import { Council } from '@/components/home/Council'
import { Continuity } from '@/components/home/Continuity'
import { site } from '@/content/site'
import { useSeo } from '@/lib/seo'

export default function Home() {
  useSeo({ title: site.seo.title, description: site.seo.description, path: '/' })
  return (
    <>
      <Hero />
      <Purpose />
      <Branches />
      <Council />
      <Continuity />
    </>
  )
}
