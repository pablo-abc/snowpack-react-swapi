import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import client from '../request'
import { ALL_PEOPLE } from '../queries'
import StoreContext from '../store'

const useStyles = makeStyles((theme) => ({
  list: {
    [theme.breakpoints.up('md')]: {
      borderRight: '1px solid',
      borderRightColor: theme.palette.divider,
      overflowY: 'scroll',
      height: '100vh',
    },
  },
}))

function PeopleList() {
  const { setSelected } = useContext(StoreContext)
  const [people, setPeople] = useState([])
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const classes = useStyles()

  useEffect(() => {
    async function requestPeople() {
      const response = await client.request(ALL_PEOPLE)
      if (response.allPeople?.people) {
        setPeople(response.allPeople.people)
        setError(undefined)
      } else if (response.errors) {
        setError(response)
      }
      setLoading(false)
    }
    requestPeople()
  }, [])

  return (
    <List className={classes.list}>
      <Toolbar />
      {loading && <p>Loading...</p>}
      {!loading && people?.map(person => (
        <React.Fragment key={person.id}>
          <ListItem button onClick={() => setSelected(person)}>
            <ListItemText
              primaryTypographyProps={{
                color: 'textPrimary',
              }}
              primary={person.name}
              secondary={`${person.species?.name || 'Human'} from ${person.homeworld.name}`}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  )
}

export default PeopleList
