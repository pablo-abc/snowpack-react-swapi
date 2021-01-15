import { gql } from 'graphql-request'

export const ALL_PEOPLE = gql`
  query AllPeople {
    allPeople {
      people {
        id
        name
        species {
          id
          name
        }
        homeworld {
          id
          name
        }
      }
    }
  }`

export const PERSON = gql`
  query Person(
    $id: ID
  ) {
    person(
      id: $id
    ) {
      id
      name
      eyeColor
      hairColor
      skinColor
      birthYear
      vehicleConnection {
        vehicles {
          id
          name
        }
      }
    }
  }`
