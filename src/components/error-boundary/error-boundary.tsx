import { Component, ReactNode } from 'react';
import ErrorIndicator from '../error-indicator/error-indicator';

interface IProps {
  children: ReactNode;
}

export default class ErrorBoundary extends Component<IProps> {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) return <ErrorIndicator />;

    return children;
  }
}
