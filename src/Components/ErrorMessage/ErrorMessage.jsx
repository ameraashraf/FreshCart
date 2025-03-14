function ErrorMessage({ message }) {
  return (
    <div className="alert alert-danger text-center my-3" role="alert">
      ❌ {message || "Something went wrong!"}
    </div>
  );
}

export default ErrorMessage;
