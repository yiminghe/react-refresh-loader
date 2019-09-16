
  /// Actual component code
  import React from "react";

  export const Index = () => {
    const [counter, setCounter] = React.useState(0);

    React.useEffect(()=>{
      console.log('update');
      return ()=>{
        console.log('cleanup');
      };
    },[1]);

    return (
      <div onClick={() => setCounter(counter + 1)}>
        Change here does not! {counter}
      </div>
    );
  };

