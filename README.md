Recruit
=========================

A general-purpose reducer.


## Installation

To use Recruit with your app, install it as a dependency:

```bash
# If you use npm:
npm install recruit lodash-es

# Or if you use Yarn:
yarn add recruit lodash-es
```

Note that `lodash-es` is peer dependencies of this plugin that need to be installed separately.


## Example

```js
import { mapReducer } from 'recruit';

let state = null;

state = mapReducer(state, {type: 'set', payload: {id: 1, name: 'Recruit'}});
// {id: 1, name: 'Recruit'}

state = mapReducer(state, {type: 'merge', payload: {name: 'Sanonz', gender: 0}});
// {id: 1, name: 'Sanonz', gender: 0}
```

```js
import { listReducer } from 'recruit';

let state = [];

state = mapReducer(state, {type: 'add', payload: 1});
// [1]

state = mapReducer(state, {type: 'addAll', payload: [5, 6]});
// [1, 5, 6]

state = mapReducer(state, {type: 'insert', payload: [index: 1, element: 2]});
// [1, 2, 5, 6]

state = mapReducer(state, {type: 'insertAll', payload: [index: 2, elements: [3, 4]]});
// [1, 2, 3, 4, 5, 6]

state = mapReducer(state, {type: 'remove', payload: 5});
// [1, 2, 3, 4, 6]

state = mapReducer(state, {type: 'removeAll', payload: [3, 4]});
// [1, 2, 6]

state = mapReducer(state, {type: 'replace', payload: {oldElement: 6, newElement: 3}});
// [1, 2, 3]

state = mapReducer(state, {type: 'pop', payload: 1);
// [1, 3]

state = mapReducer(state, {type: 'pop', payload: 0);
// [3]
```

This is an interactive version of the code that you can play with online.

[Todo List Example](https://codesandbox.io/embed/todo-list-react-recoil-dvyg2?hidenavigation=1&theme=dark)

## Documentation

### `mapReducer`

 Action                                            | Description
---------------------------------------------------|-------------------------------------
`{type: 'set', payload: x}`                        | Sets the `x` of the object.
`{type: 'merge', payload: x}`                      | Deeply mix the properties of `x` into the object.

---

### `listReducer`

 Action                                                        | Description
---------------------------------------------------------------|-------------------------------------
`{type: 'add', payload: x}`                                    | Appends the `x` to the end of this list.
`{type: 'addAll', payload: [x]}`                               | Appends all of the elements in the `x` collection to the end of this list.
`{type: 'insert', payload: {index: idx, element: x}}`          | Inserts the `x` at the `idx` in this list.
`{type: 'insertAll', payload: {index: idx, elements: [x]}}`    | Inserts all of the `[x]` at the `idx` in this list.
`{type: 'remove', payload: x}`                                 | Removes the first occurrence of the `x` from this list.
`{type: 'removeAll', payload: [x]}`                            | Removes from this list all of its elements that are contained in the `[x]`.
`{type: 'replace', payload: {oldElement, newElement}}`         | Replaces each element of this list with the result of applying the operator to that element.
`{type: 'pop', payload: idx}`                                  | Removes element at the given `idx`. If no `idx` is specified, pop removes the last item in the list.

---

## Issues

If you find a bug, please file an issue on [our issue tracker on GitHub](https://github.com/sanonz/react-recast/issues).

## License

[MIT](LICENSE.md)