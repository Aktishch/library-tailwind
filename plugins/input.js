const plugin = require('tailwindcss/plugin')
const { parseColor, formatColor } = require('tailwindcss/lib/util/color')

module.exports = plugin(({ addComponents, matchComponents, theme }) => {
  addComponents({
    '.input-cover': {
      display: 'flex',
      width: '100%',
      '--tw-input-radius': theme('borderRadius.lg'),
      '& .input': {
        flexGrow: 1,
      },
      '& .input:first-child': {
        borderTopLeftRadius: 'var(--tw-input-radius)',
        borderBottomLeftRadius: 'var(--tw-input-radius)',
      },
      '& .input:last-child': {
        borderTopRightRadius: 'var(--tw-input-radius)',
        borderBottomRightRadius: 'var(--tw-input-radius)',
      },
    },
    '.input': {
      '--tw-input-text': theme('colors.black.DEFAULT'),
      display: 'block',
      width: '100%',
      height: 'var(--tw-input-size)',
      color: 'var(--tw-input-text)',
      fontSize: theme('fontSize.base'),
      fontWeight: theme('fontWeight.normal'),
      backgroundColor: theme('colors.white.DEFAULT'),
      padding: 'calc(var(--tw-input-size) / 4) calc(var(--tw-input-size) / 3)',
      border: '1px solid var(--tw-input-color)',
      transition: '200ms ease',
      userSelect: 'initial',
      '&:not(&-error):focus': {
        borderColor: 'var(--tw-input-focus)',
      },
      '&:disabled': {
        pointerEvents: 'none',
        opacity: 0.5,
      },
      '&-fade': {
        '--tw-input-text': theme('colors.white.DEFAULT'),
        backgroundColor: theme('colors.transparent'),
      },
      '&-error': {
        borderColor: theme('colors.red.DEFAULT'),
      },
      '&:-webkit-autofill': {
        color: 'var(--tw-input-text) !important',
        borderColor: 'var(--tw-input-color)',
        background: 'none !important',
        appearance: 'none',
        transition: 'background-color 1000000ms ease-in-out 0ms',
        '-webkit-text-fill-color': 'var(--tw-input-text) !important',
        '-webkit-text-stroke-color': 'var(--tw-input-text) !important',
      },
    },
  })
  matchComponents(
    {
      'input-cover': (radius) => {
        return {
          '--tw-input-radius': radius,
        }
      },
    },
    {
      values: theme('borderRadius'),
    }
  )

  matchComponents(
    {
      input: (color) => {
        if (!color.DEFAULT) return null

        const parsed = parseColor(color.DEFAULT)

        if (!parsed.color) return null

        return {
          '--tw-input-color': formatColor({
            mode: 'rgba',
            color: parsed.color,
            alpha: 0.3,
          }),
          '--tw-input-focus': color.DEFAULT,
        }
      },
    },
    {
      values: theme('colors'),
    }
  )
  matchComponents(
    {
      input: (constant) => {
        return {
          '--tw-input-size': `${constant / 16}rem`,
        }
      },
    },
    {
      values: theme('constants'),
    }
  )
})
