interface _404Props{
    _404Header?:string,
    _404Body?:string
}

const _404:React.FC<_404Props> = ({_404Body,_404Header}) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-gray-800">
            <h1 className="text-6xl font-bold">404</h1>
            <h2 className="mt-2 text-2xl">{_404Header ?  _404Header: "Oops! Page Not Found"}</h2>
            <p className="mt-4">{_404Body ? _404Body:"The page you are looking for does not exist."}</p>
            <a 
                href="/dashboard/" 
                className="mt-6 text-blue-500 hover:text-blue-700 font-semibold"
            >
                Go back to Home
            </a>
        </div>
    );
};

export default _404;
