export type ListOnChangeItemFn<T> = (args: ListOnChangeItem<T>) => void
export interface ListOnChangeItem<T> {
  index: number
  item?: T
  selected?: boolean
  arr?: T[]
  selectedIndexes?: number[]
}
export interface ListProps<T> {
  data: T[]
  onChangeItem?: ListOnChangeItemFn<T>
  renderer: (item: T, index: number, arr: T[]) => JSX.Element
}
