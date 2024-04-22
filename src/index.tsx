/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App'
import { Route, Router } from '@solidjs/router'
import { lazy } from 'solid-js'

const Character = lazy(() => import('~/views/Character'))
const Episode = lazy(() => import('~/views/Episode'))
const Home = lazy(() => import('~/views/Home'))

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?'
  )
}

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/episode/:id" component={Episode} />
      <Route path="/character/:id" component={Character} />
    </Router>
  ),
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  root!
)
