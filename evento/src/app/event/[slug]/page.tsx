type EventPageProps = {
  params: {
    slug: string
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = params
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`,
  )
  const event = await response.json()
  console.log('Event :', event)
  return <div>EventPage</div>
}
