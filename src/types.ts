export type PartialDeep<T> = {
  [P in keyof T]?: T[P] extends Array<infer I>
    ? Array<PartialDeep<I>>
    : PartialDeep<T[P]>;
};
