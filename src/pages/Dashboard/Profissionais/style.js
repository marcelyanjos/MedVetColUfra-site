const styles = {
    paper: {
        width: "100%",
        mb: 2,
        borderRadius: 4,
        boxShadow: "0px 1px 3px 0px rgba(65,65, 65, 0.1)",
        padding: 1,
    }, modal: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        alignItems: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        width: '85%',
        minHeight: 600,
        height: '90%',
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 24,
        p: 3,
        '&::-webkit-scrollbar': {
            width: 10,
            border: '1px outset'
        },
        '&::-webkit-scrollbar-track': {
            // boxShadow: 'inset 0 0 5px grey',
            borderRadius: 10
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'rgba(179, 232, 255, 0.5)',
            borderRadius: 10
        }
    },
    modalBox: {
        justifyContent: 'space-between',
        p: 1
    }
}
export default (styles);