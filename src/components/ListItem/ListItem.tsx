import React from 'react'
import { ListItemProps } from './types'

function ListItem(props: ListItemProps) {
  console.log('ListItem')
  return (
    <div className='flex'>
      <input type='checkbox'
        onChange={props.onChangeItem}
        checked={props.selected} />
      {props.children}
    </div>
  )
}
const areEquals = (prevProp: ListItemProps, nextProp: ListItemProps): boolean =>
  nextProp.id === prevProp.id && nextProp.selected === prevProp.selected

export default ListItem
export const MemoizedListItem = React.memo(ListItem, areEquals)
