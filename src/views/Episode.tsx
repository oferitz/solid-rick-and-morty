import { type Component, createResource, For } from 'solid-js'
import { A, useParams } from '@solidjs/router'
import * as api from 'rickmortyapi'
import { getCharacter } from 'rickmortyapi/dist/character'
import { Badge } from '~/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Card, CardHeader, CardTitle } from '~/components/ui/card'

const fetchEpisode = async (id: string) => {
  const episodesRes = await api.getEpisode(Number(id))
  const charactersIds = episodesRes.data.characters.map((url) => {
    const id = url.split('/').pop()
    return id ? Number(id) : 0
  })
  const charactersRes = await api.getCharacter(charactersIds)
  return { ep: episodesRes.data, ch: charactersRes.data }
}

const Episode: Component = () => {
  const { id } = useParams()
  const [episode] = createResource(id, fetchEpisode)

  return (
    <div class="mt-8">
      <div class="flex flex-col gap-4">
        <h1 class="text-5xl">{episode()?.ep?.name}</h1>
        <p class="text-muted-foreground">{episode()?.ep.air_date}</p>
        <Badge class="self-start">{episode()?.ep.episode}</Badge>
      </div>
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-4">
        <For each={episode()?.ch}>
          {(item, index) => (
            <Card>
              <CardHeader class="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={item.image} />
                  <AvatarFallback>{item.name}</AvatarFallback>
                </Avatar>
                <A href={`/character/${item.id}`}>
                  <CardTitle>{item.name}</CardTitle>
                </A>
              </CardHeader>
            </Card>
          )}
        </For>
      </div>
    </div>
  )
}

export default Episode
