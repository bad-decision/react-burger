import { Component } from 'react';
import ErrorIndicator from '../error-indicator/error-indicator';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;

    if (hasError) return <ErrorIndicator />;

    return children;
  }
}
