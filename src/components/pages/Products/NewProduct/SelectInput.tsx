import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, CircularProgress, Tooltip, Typography } from '@mui/material';

export default function SelectInput<T>({ label, setSelected, data, removable = true }:
    { label: string, data: T[] | [], setSelected?: React.Dispatch<React.SetStateAction<T | undefined>>, removable?: boolean }) {

    if (data) {
        return (
            <Autocomplete
                disablePortal
                //isOptionEqualToValue={ }
                onChange={(e, value) => removable && setSelected(value)}
                id="combo-box-demo"
                renderOption={(props, option) => {

                    return <Box key={option.prop ? option.prop.id : option.id} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} >
                        {option.prop ?
                            <Tooltip key={option.prop.id} title={option.prop.name.toString()} >
                                <Typography variant="subtitle1" gutterBottom>
                                    {option.name || option.value}
                                </Typography>
                            </Tooltip>
                            :
                            <>{option.name || option.value}</>
                        }

                    </Box>
                }
                }
                getOptionLabel={(option) => option.name || option.value || ""}
                renderInput={(params) => <TextField {...params} label={label} />}
                options={data} />
        );
    }
    return <Box sx={{ display: 'flex', justifyContent: "center" }}>
        <CircularProgress />
    </Box>

}
