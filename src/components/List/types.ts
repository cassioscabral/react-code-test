export type ItemRenderer<T> = (item: T) => React.ReactNode
export type OnChangeHandler = (indexList: number[]) => void
export type ItemClassName<T> = (item: T) => string

export interface WithId {
  id: number
}

export interface ListProps<T> {
  data: T[]
  onChange: OnChangeHandler
  renderer: ItemRenderer<T>
  itemClassName?: ItemClassName<T> | string
}
