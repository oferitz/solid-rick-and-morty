import { type ParentComponent, Suspense } from 'solid-js'
import {
  ColorModeProvider,
  ColorModeScript,
  createLocalStorageManager
} from '@kobalte/core'
import { ThemeToggle } from '~/components/ThemeToggle'
import { A } from '@solidjs/router'

const App: ParentComponent = (props) => {
  const storageManager = createLocalStorageManager('vite-ui-theme')

  return (
    <div class="container p-10">
      <ColorModeScript storageType={storageManager.type} />
      <ColorModeProvider storageManager={storageManager}>
        <header class="flex items-center justify-between border-b py-4">
          <A href="/">
            <h1 class="text-2xl font-semibold">Solid Rick and Morty</h1>
          </A>
          <ThemeToggle />
        </header>
        <Suspense>{props.children}</Suspense>
      </ColorModeProvider>
    </div>
  )
}

export default App
