import { Alert, Snackbar } from '@mui/material'
import { FunctionComponent } from 'react'
import IError from '../interfaces/IError'

const Errors: FunctionComponent<{ errs: IError[] | undefined }> = ({ errs }) => {
    if (!errs) {
        return
    }
    return (

        <div>
            <Snackbar
                open={open}
                autoHideDuration={8000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="error">{errs.length > 0 ? errs[0].message : 'Server Error'}</Alert>
            </Snackbar>
        </div>
    )
}
export default Errors
