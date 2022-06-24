import { useState, useEffect } from 'react'
import { ListProps } from './types'
import { MemoizedItem, OnSelectHandler } from './Item'

export default function List<T>(props: ListProps<T>): JSX.Element {
  // track selected items by a Set of indexes
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set([]))

  useEffect(() => {
    props.onChange(Array.from(selectedItems))
  }, [selectedItems])

  const onSelectHandler: OnSelectHandler = (index, selected) => {
    setSelectedItems((prevItems) => {
      const newSet = new Set(prevItems)

      if (selected) {
        newSet.add(index)
      } else {
        newSet.delete(index)
      }
      return newSet
    })
  }

  return (
    <>
      {props.data.map((item, index) => {
        return (
          <MemoizedItem
            className={
              typeof props.itemClassName === 'function'
                ? props.itemClassName(item)
                : props.itemClassName
            }
            selected={selectedItems.has(index)}
            onSelect={onSelectHandler}
            id={index}
            key={index}
          >
            {props.renderer(item, index)}
          </MemoizedItem>
        )
      })}
    </>
  )
}
