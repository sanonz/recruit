import { pull, pullAll } from 'lodash-es';

import ReducerError from './ReducerError';

export enum ListActionType {
  Fill = 'fill',
  Add = 'add',
  AddAll = 'addAll',
  Insert = 'insert',
  InsertAll = 'insertAll',
  Remove = 'remove',
  RemoveAll = 'removeAll',
  Replace = 'replace',
  Pop = 'pop',
}

export interface FillAction<T> {
  type: ListActionType.Fill;
  payload: T[];
}

export interface ReplaceAction<T> {
  type: ListActionType.Replace;
  payload: {
    oldElement: T;
    newElement: T;
  };
}

export interface AddAction<T> {
  type: ListActionType.Add;
  payload: T;
}

export interface AddAllAction<T> {
  type: ListActionType.AddAll;
  payload: T[];
}

export interface InsertAction<T> {
  type: ListActionType.Insert;
  payload: {
    index: number;
    element: T;
  };
}

export interface InsertAllAction<T> {
  type: ListActionType.InsertAll;
  payload: {
    index: number;
    elements: T[];
  };
}

export interface RemoveAction<T> {
  type: ListActionType.Remove;
  payload: T;
}

export interface RemoveAllAction<T> {
  type: ListActionType.RemoveAll;
  payload: T[];
}

export interface PopAction {
  type: ListActionType.Pop;
  payload?: number;
}

export type ListActions<T> =  FillAction<T>    | ReplaceAction<T>   |
                              AddAction<T>     | AddAllAction<T>    |
                              RemoveAction<T>  | RemoveAllAction<T> |
                              InsertAction<T>  | InsertAllAction<T> |
                              PopAction;

export function listReducer<T>(state: T[], action: ListActions<T>): T[] {
  switch(action.type) {
    case ListActionType.Fill:
      return action.payload;

    case ListActionType.Replace: {
      const payload = action.payload;
      let idx = state.indexOf(payload.oldElement);
      if (~idx) {
        const newState = [...state];
        newState.splice(idx, 1, payload.newElement);

        return newState;
      }

      return state;
    }

    case ListActionType.Add:
      return [...state, action.payload];

    case ListActionType.AddAll:
      return [...state, ...action.payload];

    case ListActionType.Insert: {
      const newState = [...state];
      const payload = action.payload;
      newState.splice(payload.index, 0, payload.element);

      return newState;
    }

    case ListActionType.InsertAll: {
      const newState = [...state];
      const payload = action.payload;
      newState.splice(payload.index, 0, ...payload.elements);

      return newState;
    }

    case ListActionType.Remove:
      return pull([...state], action.payload);

    case ListActionType.RemoveAll:
      return pullAll([...state], action.payload);

    case ListActionType.Pop: {
      const newState = [...state];
      newState.splice(action.payload === undefined ? -1 : action.payload, 1);

      return newState;
    }

    default:
      throw new ReducerError(`listReducer doesn't support action`);
  }
}
