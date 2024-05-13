
export function ErrorPage() {

  return (
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center" id="error-page">
      <h1 className="text-8xl">404</h1>
      <div className="flex-col items-center flex ">
        <h2 className="text-5xl">Not Found!</h2>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    </div>
  );
}