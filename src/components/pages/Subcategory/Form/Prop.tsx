import { FormControl, IconButton, Typography } from '@mui/material'
import React from 'react'
import IPropValue from '../../../../interfaces/Props/IPropValue'
import DeleteIcon from '@mui/icons-material/Delete';
const Prop: React.FC<{ prop: IPropValue, setProps: React.Dispatch<React.SetStateAction<IPropValue[]>>, displayItems: 1 | 2 | 3 }> = ({ prop, setProps, displayItems }) => {

    return (
        <div className='d-flex justify-content-evenly align-items-center w-100'>
            {displayItems >= 1 && <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <Typography component="p" variant="h5">
                    {prop.value}
                </Typography>
            </FormControl>}
            {displayItems >= 2 && <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <Typography component="p" variant="h5">
                    {prop.prop.name}
                </Typography>
            </FormControl>}
            {displayItems >= 3 && <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <Typography component="p" variant="h5">
                    {prop.prop.label}
                </Typography>
            </FormControl>}



            <IconButton onClick={() => {
                setProps(prev =>
                    prev.filter(p => {
                        if (p.id != prop.id) {
                            return p
                        }
                    })
                )
            }}>
                <DeleteIcon />
            </IconButton>



        </div>
    )
}
export default Prop