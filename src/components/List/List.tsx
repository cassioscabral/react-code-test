import { useState } from 'react'
import { ListProps } from './types'
import { MemoizedItem, OnSelectHandler } from './Item'

export default function List<T>(props: ListProps<T>): JSX.Element {
  // track selected items by a Set of indexes
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set([]))

  const onSelectHandler: OnSelectHandler = (index, selected) => {
    setSelectedItems((prevItems) => {
      const newSet = new Set(prevItems)

      if (selected) {
        newSet.add(index)
      } else {
        newSet.delete(index)
      }
      if (props.onChange) {
        props.onChange(Array.from(newSet))
      }
      return newSet
    })
  }


  return (
    <div className='flex-col'>
      {props.data.map((item, index) => {
        return (
          <MemoizedItem
            selected={selectedItems.has(index)}
            onSelect={onSelectHandler}
            id={index}
            key={index}
          >
            {props.renderer(item, index)}
          </MemoizedItem>
        )
      })}
    </div>
  )
}
