import { Button } from '@geist-ui/core';
import { Component } from 'react';

class ErrorBoundary extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <Button onClick={() => this.setState({ hasError: false })} {...({} as any)}>
            Try again?
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
