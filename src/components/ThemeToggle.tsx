import { useColorMode } from '@kobalte/core'
import { Button } from '~/components/ui/button'
import { Moon, Sun } from 'lucide-solid'

export function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Button onClick={toggleColorMode} variant="ghost" size="icon" class="rounded-full h-6 w-6">
        {colorMode() === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </Button>
    </>
  )
}
