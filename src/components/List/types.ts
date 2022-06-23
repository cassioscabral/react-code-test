export interface ListProps<T> {
  data: T[]
  renderer: (item: T, index: number, arr: T[]) => JSX.Element
}
