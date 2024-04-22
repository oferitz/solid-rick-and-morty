import { type Component, createResource, For } from 'solid-js'
import { A, useParams } from '@solidjs/router'
import * as api from 'rickmortyapi'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

const fetchCharacter = async (id: string) => {
  const characterRes = await api.getCharacter(Number(id))
  const episodesIds = characterRes.data.episode.map((url) => {
    const id = url.split('/').pop()
    return id ? Number(id) : 0
  })
  const episodesRes = await api.getEpisode(episodesIds)
  return { ep: episodesRes.data, ch: characterRes.data }
}

const Character: Component = () => {
  const { id } = useParams()
  const [character] = createResource(id, fetchCharacter)

  return (
    <div class="mt-8">
      <div class="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={character()?.ch?.image} />
          <AvatarFallback>{character()?.ch?.name}</AvatarFallback>
        </Avatar>
        <h1 class="text-3xl">{character()?.ch?.name}</h1>
      </div>
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-4">
        <For each={character()?.ep}>
          {(item, index) => (
            <Card>
              <CardContent class="flex flex-col items-center justify-center gap-4 text-center p-4">
                <Badge variant="outline">{item.episode}</Badge>
                <A href={`/episode/${item.id}`}>{item.name}</A>
              </CardContent>
            </Card>
          )}
        </For>
      </div>
    </div>
  )
}

export default Character
