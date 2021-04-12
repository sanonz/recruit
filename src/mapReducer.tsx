import { isArray, mergeWith } from 'lodash-es';

import ReducerError from './ReducerError';
import type { PartialDeep } from './types';

export enum MapActionType {
  Set = 'set',
  Merge = 'merge',
}

export interface MapSetAction<T> {
  type: MapActionType.Set;
  payload: T;
}

export interface MapMergeAction<T> {
  type: MapActionType.Merge;
  payload: PartialDeep<T>;
}

export type MapActions<T> = MapSetAction<T> | MapMergeAction<T>;

export function mapReducer<T>(state: T, action: MapActions<T>): T {
  switch(action.type) {
    case MapActionType.Set:
      return action.payload;

    case MapActionType.Merge:
      return mergeWith({}, state, action.payload, (objValue, srcValue) => {
        if (isArray(objValue)) {
          return srcValue;
        }
      });

    default:
      throw new ReducerError(`mapReducer doesn't support action`);
  }
}
