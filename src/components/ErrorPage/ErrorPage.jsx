import { useRouteError } from 'react-router-dom';
import { constants } from '../../constants/constants';

import './index.css';

function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div>
            <h1 className="error-title">{constants.errorTitle}</h1>
            <p className="error-text">{constants.errorText}</p>
            <p className="error-text">
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default ErrorPage;
