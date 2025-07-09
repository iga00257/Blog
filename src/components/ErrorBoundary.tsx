import { Component } from 'react';

import { Button } from './ui/button';

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
        <div className='p-4 text-center'>
          <h2 className='mb-4 text-lg font-semibold'>Oops, there is an error!</h2>
          <Button onClick={() => this.setState({ hasError: false })}>Try again?</Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
