/// Actual component code
import React from "react";

export const Index = () => {
  const [ counter, setCounter ] = React.useState(0);

  React.useEffect(() => {
    console.log('update');
    return () => {
      console.log('cleanup');
    };
  }, [ 1 ]);

  return (
    <div onClick={() => setCounter(counter + 1)}>
      Change here does not! {counter}
    </div>
  );
};


export class IndexClass extends React.Component {
  state = {
    counter: 1,
  };

  onClick = () => {
    this.setState((state) => ({ ...state, counter: ++state.counter }));
  };

  componentDidMount() {
    console.log('IndexClass didMount');
  }

  componentWillUnmount() {
    console.log('IndexClass componentWillUnmount');
  }

  render() {
    return (
      <div onClick={this.onClick}>
        Change Class will lose state! {this.state.counter}
      </div>
    );
  }
}

