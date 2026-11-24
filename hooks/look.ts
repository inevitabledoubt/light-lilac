import type { ThemeColors, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Values are the tokens of the "Editorial Modernist" design system.
const { theme } = makeColors({
  label: 'Editorial Modernist',
  light: {
    // status-available for success; danger has no token, so stays the app's.
    roles: {
      accent: '#7c3aed',
      success: '#10b981',
      pro: '#9333ea',
    },
    // The app's own git colors, deepened to 4.5:1 on their tints over lilac.
    git: {
      added: '#0d5a21',
      removed: '#97103a',
      modified: '#5f4f0d',
      merged: '#5a38a6',
      closed: '#961712',
      conflicting: '#823909',
      draft: '#4e4e58',
    },
    gray: {
      anchors: {
        'surface-0': '#e8e0f7', // page: light lilac
        'surface-1': '#f3eefb', // cards, halfway to white
        'surface-2': '#ffffff', // panels
        'surface-3': '#ffffff', // menus
        'text-primary': '#06070b', // foreground, a hair deeper so the switch track shows on lilac
        'text-secondary': '#423f4d', // muted, deepened for lilac
        'text-muted': '#494655', // muted, deepened for lilac
      },
      stops: {
        40: '#e0d7f1',
        60: '#d7cdeb',
        80: '#ccc1e3',
      },
    },
  },
  dark: {
    roles: { accent: '#e070ff', success: '#10b981', pro: '#8b5cf6' },
    gray: {
      anchors: {
        'surface-0': '#0c0e14', // background
        'surface-1': '#141624', // surface
        'surface-2': '#141624', // surface
        'surface-3': '#1f1b31', // surface-hover
        'text-primary': '#ffffff', // foreground
        'text-secondary': '#cbd5e1', // between foreground and muted
        'text-muted': '#94a3b8', // muted
      },
      stops: { 750: '#2b2545' }, // surface-active
    },
  },
})

// makeColors keeps a role's hue and picks its lightness. These put back the
// exact accent fills, the inverted tooltip, and the message colors.
export const colors: ThemeColors = {
  ...theme,
  inputs: {
    light: {
      ...theme.inputs.light,
      'role-accent-600': '#6d28d9', // accent text: one step deeper than the token, for 4.5:1 on tints
      'role-accent-fill': '#7c3aed',
      'role-accent-fill-hover': '#6d28d9',
      'role-accent-on': '#ffffff', // accent-foreground
      'role-warning-fill': '#a87000', // deepened to 3:1 on lilac
      'role-warning-fill-hover': '#b07500',
      'role-tooltip-bg': '#0c0e14',
      'role-tooltip-fg': '#ffffff',
      'bg-user-message': '#d9cef0', // one tonal step below the page
      'text-user-message': '#090a0f',
    },
    dark: {
      ...theme.inputs.dark,
      'role-accent-300': '#e070ff', // accent text and icons
      'role-accent-fill': '#e070ff',
      'role-accent-fill-hover': '#d45ef5',
      'role-accent-on': '#0c0e14', // accent-foreground
      'role-tooltip-bg': '#ffffff',
      'role-tooltip-fg': '#090a0f',
      'bg-user-message': '#141624', // surface
      'text-user-message': '#ffffff',
    },
  },
}

export const LOOK: ThemeSetArgs = {
  colors,
  style: {
    Text: { fontFamily: ['sans'], fontSize: 16, lineHeight: 26, letterSpacing: -0.16 },
    Heading: { fontFamily: ['serif'], fontWeight: 'bold', letterSpacing: -0.5 },
    UserMessage: {
      backgroundColor: 'bg-user-message',
      color: 'text-user-message',
      borderColor: 'border',
      borderWidth: 1,
      radius: 24,
      shadow: 'none',
      paddingX: 20,
      paddingY: 12,
    },
    ToolUse: { fontFamily: ['mono'], color: 'text-muted' },
  },
}
