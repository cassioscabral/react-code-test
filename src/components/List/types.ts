export type ItemRenderer<T> = (item: T, index: number) => JSX.Element
export type OnChangeHandler = (indexList: number[]) => void
export type ItemClassName<T> = (item: T) => string

export interface ListProps<T> {
  data: T[]
  onChange: OnChangeHandler
  renderer: ItemRenderer<T>
  itemClassName?: ItemClassName<T> | string
}
