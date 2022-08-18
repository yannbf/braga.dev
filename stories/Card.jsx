import React from 'react'
import { useTheme } from '@emotion/react'

export const Card = () => {
  const theme = useTheme()
  const cardStyles = {
    backgroundImage: theme.backgrounds.card,
    color: theme.text,
    maxWidth: 300,
    borderRadius: 8,
    boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.3)',
    fontFamily: 'Verdana',
    lineHeight: 1.6,
  }

  return (
    <div style={cardStyles}>
      <div style={{ padding: 30 }}>
        <h2>Card Title</h2>
        <p>
          Lucas ipsum dolor sit amet fett utapau aayla sith c-3p0 moff ventress mustafar windu
          ponda. Moff darth hutt hutt kessel. Bothan moff chewbacca yavin hoth ackbar kit ewok mace.
        </p>
      </div>
    </div>
  )
}
