import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <span>404</span>
      <h1>Page not found</h1>
      <Link to="/">Go back to home page</Link>
    </div>
  );
};

export default NotFoundPage;
