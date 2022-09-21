import { useState, useEffect, PropsWithChildren } from 'react'
import { ListProps, WithId } from './types'
import { MemoizedItem, OnSelectHandler } from './Item'

export default function List<T extends WithId>(props: PropsWithChildren<ListProps<T>>): JSX.Element {
  // track selected items by a Set of indexes
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set([]))

  useEffect(() => {
    const indexList: number[] = props.data
      .map((item, index) => selectedItems.has(item.id) ? index : null)
      .filter(i => i !== null) as number[]
    props.onChange(indexList ?? [])
  }, [selectedItems])

  const onSelectHandler: OnSelectHandler = (id, selected) => {
    setSelectedItems((prevItems) => {
      const newSet = new Set(prevItems)

      if (selected) {
        newSet.add(id)
      } else {
        newSet.delete(id)
      }
      return newSet
    })
  }

  return (
    <>
      {props.data.map((item) => {
        return (
          <MemoizedItem
            className={
              typeof props.itemClassName === 'function'
                ? props.itemClassName(item)
                : props.itemClassName
            }
            selected={selectedItems.has(item.id)}
            onSelect={onSelectHandler}
            id={item.id}
            key={item.id}
          >
            {props.renderer(item)}
          </MemoizedItem>
        )
      })}
    </>
  )
}
