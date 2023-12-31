import { FormControl, IconButton, Input, InputLabel } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export interface value {
    id: string;
    value: string
}
type fn=(prev:value[])=>value[]
export interface IValueProps {
    setValues: (fn:fn)=>void
    value: value
}
export default function Value({ setValues, value }: IValueProps) {
    function add() {
        //@ts-ignore
        setValues(prev => {
            return [...prev, { id: parseInt((Math.random() * 1234567890).toString()), value: "" }];
        })
    }
    function remove() {
        setValues(prev => {
            if (prev.length > 1) {
                return prev.filter(f => f.id !== value.id)
            }
            return prev
        })
    }
    return (
        <div className='d-flex'>
            <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-min">Value</InputLabel>
                <Input
                    id="standard-adornment-min"
                    name='value'
                />
            </FormControl>


            <IconButton sx={{ m: 1.2, }} onClick={add} >
                <AddIcon />
            </IconButton>

            <IconButton sx={{ m: 1.2, }} onClick={remove}>
                <RemoveIcon />
            </IconButton>


        </div>
    )
}
