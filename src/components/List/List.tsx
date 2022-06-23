import React from 'react'
import { ListProps } from './types'

function List<T>(props: ListProps<T>): JSX.Element {
  return <>{props.data.map(props.renderer)}</>
}

export default List
