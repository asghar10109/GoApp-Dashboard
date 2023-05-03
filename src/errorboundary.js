import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>          
        <img style={{width:'100%' ,height:'100%'}} src="https://w3-lab.com/wp-content/uploads/2022/09/FOR-WEB-404-astronaut-770x444.jpg"></img>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
