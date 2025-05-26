import type { Metadata, ResolvingMetadata } from 'next'
import BeatDetails from "@/components/BeatDetails"
import Footer from "@/components/Footer"


interface BeatDetailsPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function BeatDetailsPage({ params }: BeatDetailsPageProps) {
  const { id } = await params

  return (
    <main className="min-h-screen bg-black">
      <BeatDetails beatId={id} />
      <Footer />
    </main>
  )
}
export async function generateMetadata(
  { params }: BeatDetailsPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `Beat ${(await params).id}`,
  }
}