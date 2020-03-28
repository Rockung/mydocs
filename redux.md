# Redux

## Redux Flow

![redux-flow](D:\srx\mydocs\images\redux-flow.webp)

## The Principle

1. Web applications are a state machine, in which one state is mapped onto a view
2. All states are saved in an object called store

## Concepts and API

### Store

**Store** is a container that data is saved. One application has only one **Store**.

```javascript
import { createStore } from 'redux';
const store = createStore(reducer);
```

### State

**State** is a snapshot of **Store** at a moment. We can get it when we want.

```javascript
const state = store.getState();
```

### Action

The change of **State** leads to the change of view. We can't touch **State**, we only touch a view. When we touch a view,  an **Action** is sent to notify the change of the **State**  as a message .

```javascript
const action = {
    type: 'ADD_TODO',
    payload: 'Go home'
};
```

### Action Creator

Letting a creator to produce actions is a good way to release your pressure.

```javascript
const ADD_TODO = 'ADD_TODO';

function addTodo(text) {
	return {
        type: ADD_TODO,
        text
    };    
}

const action = addTodo('Go home');
```

### Dispatch

You have to have a way to dispatch actions to the **Store** from a view.

```javascript
store.dispatch(action);
```

### Reducer

When it receives a **Action**,  the **Store** should compute the next **State** it will be according to the current **State**, and notify the change to the subscribes. The computing is called **Reducer**, which is a function.

```javascript
const defaultState = 0;
const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD':
            return state + action.payload;
        default:
            return state;
    }
};

const state = reducer(1, {
    type: 'ADD',
    payload: 2
});
```

Why this function is called Reducer? Because it can be used as a parameter of `reduce` method in **Array**.

```javascript
const actions = [
    {type: 'ADD', payload: 0},
    {type: 'ADD', payload: 1},
    {type: 'ADD', payload: 2}
];

const total = actions.reduce(reducer, 0); // 3
```

### Pure Function

**Reducer** has an important feature, it's a pure function, which have the same output with the same input.

The following are the constraints when you write a pure function.

- cannot change the contents of parameters
- cannot call system I/O
- cannot call methods such as Date.now() or Math.random(), they are non-pure

For reference

```javascript
// State is an object
function reducer(state, action) {
    return Object.assign({}, state, { thingToChange });
    // or
    return { ...state, ...newState };
}

// State is an array
function reducer(state, action) {
    return [ ...state, newItem ];
}
```

### Subscribe

You can subscribe the changes of state in the store.

```javascript
store.subscribe(listener);

// returns a function
let unsubscribe = store.subscribe(() =>{
    console.log(store.getState());
});

// use the function to unsubscribe from the store
unsubscribe();
```

## Decomposition of Reducer

If an application have many kinds of states, it leads to the expansion of reducer. You can decompose the reducer as many small reducers, and then combine them together.

```javascript
import { combineReducers } from 'redux';
import * as reducers from './reducers'

const reducer = combineReducers(reducers);
```

## An Implementation of Store

**Store** provides three methods.

```javascript
import { createStore } from 'redux'

let { subscribe, dispath, getState } = createStore(reducer);
```

**createStore** accepts a second parameter as the initial state of the store.

```javascript
let store = createStore(todoApp, window.STATE_FROM_SERVER);
```

A simple implementation of **Store**

```javascript
const createStore = (reducer) => {
    let state;
    let listeners = [];
    
    const getState = () => state;
    
    const dispatch = (action) => {
    	state = reducer(state, action);
        listeners.forEach(listener => listener());
    };
    
    const subscribe = (listener) => {
    	listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listeners);
        };
    };
    
    // initialize the state
    dispatch({});
    
    return {getState, dispatch, subscribe };
};
```

