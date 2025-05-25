import type { Metadata, ResolvingMetadata } from 'next'
import BeatDetails from "@/components/BeatDetails"

interface Props {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function BeatDetailsPage({ params }: Props) {
  return (
    <main className="min-h-screen bg-black">
      <BeatDetails beatId={params.id} />
    </main>
  )
}

// Add this if you need dynamic metadata
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `Beat ${params.id}`,
  }
}