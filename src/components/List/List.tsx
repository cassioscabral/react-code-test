import React, { useState } from 'react'
import { ListProps,  ListOnChangeItem } from './types'

function List<T>(props: ListProps<T>): JSX.Element {
  // track selected items by a Set of indexes
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set([]))

  const checkboxOnChangeHander = ({ index, item, selected, arr }: ListOnChangeItem<T>) => {
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
      <div className='select-column flex-col'>
        {props.data.map((item: T, index: number) => {
          return (
            <input
              type='checkbox'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkboxOnChangeHander({ index, selected: e.target.checked, item, arr: props.data })}
              key={index}
              checked={selectedItems.has(index)}
            />
          )
        })}
      </div>
      <div className='list-column flex-col'>{props.data.map(props.renderer)}</div>
    </div>
  )
}

export default List
