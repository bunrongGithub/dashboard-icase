import { useRouteError } from "react-router-dom";

export default function ErrorPage(){
    const error: any = useRouteError();
    console.error(error);
    return (
        <div id="error-page">
          <h1 className="text-black">Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error}</i>
          </p>
        </div>
      );
}