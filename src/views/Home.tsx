import {
  createResource,
  Switch,
  Match,
  type Component,
  Suspense,
  For,
  createSignal,
  createEffect
} from 'solid-js'
import * as api from 'rickmortyapi'

import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationItems,
  PaginationNext,
  PaginationPrevious
} from '~/components/ui/pagination'
import { Badge } from '~/components/ui/badge'
import { A } from '@solidjs/router'

const fetchEpisodes = async (page: number) => {
  const response = await api.getEpisodes({ page })
  return response.data
}

const Home: Component = () => {
  const [page, setPage] = createSignal(1)
  const [episodes, actions] = createResource(page, fetchEpisodes)

  return (
    <div class="mt-8">
      <Suspense
        fallback={
          <div>
            <span>Loading...</span>
          </div>
        }
      >
        <Switch>
          <Match when={episodes.error}>
            <span>Error: {episodes.error()}</span>
          </Match>
          <Match when={episodes()}>
            <div class="grid grid-cols-1 gap-2">
              <For each={episodes()?.results}>
                {(item, index) => (
                  <div class="flex items-center gap-4">
                    <Badge variant="outline">{item.episode}</Badge>
                    <A href={`/episode/${item.id}`}>{item.name}</A>
                    <span class="text-muted-foreground text-sm">
                      {item.air_date}
                    </span>
                  </div>
                )}
              </For>
            </div>
            <Pagination
              class="mt-8"
              page={page()}
              onPageChange={setPage}
              count={episodes()?.info?.pages ?? 1}
              itemComponent={(props) => (
                <PaginationItem page={props.page}>{props.page}</PaginationItem>
              )}
              ellipsisComponent={() => <PaginationEllipsis />}
            >
              <PaginationPrevious />
              <PaginationItems />
              <PaginationNext />
            </Pagination>
          </Match>
        </Switch>
      </Suspense>
    </div>
  )
}

export default Home
