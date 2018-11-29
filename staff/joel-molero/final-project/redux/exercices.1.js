const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

const { createStore } = Redux; //holds the current application state object, lets you disspatch actions, you need to specify the reducer that tells hos state is updated with actions. 
// import { createStore } from 'redux';
const store = createStore(counter);

console.log(store.getState());

store.dispatch({ type: 'INCREMENT' });

store.subscribe(() => {
    document.body.innerText = store.getState();
});

document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' });
});