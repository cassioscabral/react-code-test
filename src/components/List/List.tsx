import React, { useState } from 'react'
import { ListProps, ListOnChangeItem } from './types'
import { MemoizedListItem } from '../ListItem'

function List<T>(props: ListProps<T>): JSX.Element {
  // track selected items by a Set of indexes
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set([]))

  const onChangeItemHandler = ({ index, item, selected, arr }: ListOnChangeItem<T>): void => {
    setSelectedItems((prevItems: Set<number>): Set<number> => {
      const newSet = new Set(prevItems)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      if (props.onChangeItem && typeof props.onChangeItem === 'function') {
        props.onChangeItem({ index, selected, item, arr, selectedIndexes: Array.from(newSet) })
      }
      return newSet
    })
  }

  return (
    <div className='flex'>
      <div className='flex-col'>{props.data.map((item: T, index: number) => {
    return (
      <MemoizedListItem
        selected={selectedItems.has(index)}
        onChangeItem={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChangeItemHandler({
            index,
            item,
            selected: e.target.checked,
            arr: props.data,
          })
        }
        id={index}
        key={index}
      >
        {props.renderer(item, index, props.data)}
      </MemoizedListItem>
    )
  })}</div>
    </div>
  )
}

export default List
