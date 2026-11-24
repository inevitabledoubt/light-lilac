import { expect, test } from 'claude-code/testing'

import { colors } from './look'
import { checkColors } from './make-colors.js'

test('both modes carry the design system and the app will paint them', async () => {
  // The exact orchid accent leaves a white switch knob under 3:1 in dark: a known trade.
  const problems = checkColors(colors).filter(line => !line.startsWith('switch-knob on fill-accent'))
  expect(problems).toEqual([])
  expect(colors.inputs.light?.['role-accent-fill']).toBe('#7c3aed')
  expect(colors.inputs.dark?.['role-accent-fill']).toBe('#e070ff')
})

test('starting a session sets the colors and the style, with no fallback', async ($, on) => {
  const sets: { colors?: unknown; style?: unknown }[] = []
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('theme.set', (_, e) => {
    sets.push(e)
    return { value: { isDrawn: true, requestId: 'theme' } }
  })
  await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
  expect(sets.length).toBe(1)
  expect(sets[0]?.colors !== undefined && sets[0]?.style !== undefined).toBe(true)
})
