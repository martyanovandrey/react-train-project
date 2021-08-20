import React, {useState} from 'react';

const Counter = () => {
    const [counter, setCounter] = useState(0);

    function increase() {
        setCounter(state => state + 1)
    }

    return (
        <>
            <h1>{counter}</h1>
            <button onClick={increase}>Increase</button>
        </>
    );
};

export default Counter;
