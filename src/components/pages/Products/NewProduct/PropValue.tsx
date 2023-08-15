export default function PropValue({ setValues, value }: IValueProps) {
    function add() {
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



            <IconButton sx={{ m: 1.2, }} onClick={add} >
                <AddIcon />
            </IconButton>

            <IconButton sx={{ m: 1.2, }} onClick={remove}>
                <RemoveIcon />
            </IconButton>


        </div>
    )
}
