import { memo } from 'react'
import { ItemProps } from './types'

function Item(props: ItemProps) {
  return (
    <div className='flex items-center space-x-2'>
      <input
        type='checkbox'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          props.onSelect(props.id, e.target.checked)
        }
        checked={props.selected}
      />

      {props.children}
    </div>
  )
}
const areEquals = (prevProp: ItemProps, nextProp: ItemProps): boolean =>
  nextProp.id === prevProp.id && nextProp.selected === prevProp.selected

export default Item
export const MemoizedItem = memo(Item, areEquals)
