import ErrorIcon from '@mui/icons-material/Error';

export default function Error({ message, code }: { message: string, code: number }) {
    return (
        <div className='error-page'>
            <div className="error-code">
                <ErrorIcon className='error-icon'/> {code}
            </div>
            <div className="error-msg">
                {message}
            </div>
        </div>
    )
}
