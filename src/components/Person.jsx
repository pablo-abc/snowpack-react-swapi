import React, { useContext, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import client from '../request'
import { PERSON } from '../queries'
import StoreContext from '../store'

const useStyles = makeStyles({
  row: {
    justifyContent: 'space-between',
  },
  rowText: {
    fontWeight: 'bold',
    '&::first-letter': {
      textTransform: 'capitalize',
    },
  },
  subheader: {
    fontSize: '1rem',
    marginBottom: '0px',
    marginTop: '32px',
  },
  list: {
    margin: '0 5%',
  },
})

function PersonRow({ title, text }) {
  const classes = useStyles()

  return (
    <>
      <ListItem className={classes.row}>
        <Typography className={classes.rowText} color="textSecondary">
          {title}
        </Typography>
        {!!text && (
          <Typography className={classes.rowText} color="textPrimary">
            {text}
          </Typography>
        )}
      </ListItem>
      <Divider component="li" />
    </>
  )
}

function Person() {
  const classes = useStyles()
  const { selected } = useContext(StoreContext)
  const [person, setPerson] = useState()
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function requestPerson() {
      setLoading(true)
      const response = await client.request(PERSON, { id: selected.id })
      if (response.person) {
        setPerson(response.person)
        setError(undefined)
      } else if (response.errors) {
        setError(response)
      }
      setLoading(false)
    }
    selected && requestPerson()
  }, [selected])

  if (!person) return null

  return (
    <>
      <Toolbar />
      <List className={classes.list}>
        <ListSubheader classes={classes.subheader} color="primary">
          General Information
        </ListSubheader>
        <PersonRow title="Eye Color" text={person.eyeColor} />
        <PersonRow title="Hair Color" text={person.hairColor} />
        <PersonRow title="Skin Color" text={person.skinColor} />
        <PersonRow title="Birth Year" text={person.birthYear} />
        <ListSubheader className={classes.subheader} color="primary">
          Vehicles
        </ListSubheader>
        {person.vehicleConnection.vehicles.map(vehicle => (
          <PersonRow key={vehicle.id} title={vehicle.name} />
        ))}
      </List>
    </>
  )
}

export default Person
