import type { Register } from 'claude-code'

import { LOOK } from './look'

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    try {
      await $.theme.set(LOOK)
    } catch (error) {
      // An older build refuses `style`: keep the colors.
      $.ui.log(String(error))
      await $.theme.set({ colors: LOOK.colors })
    }

    return next(e)
  })
}
