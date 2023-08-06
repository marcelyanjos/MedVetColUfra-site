const styles = {
    index_box: {
        pb: 5, display: 'flex', justifyContent: 'space-between'
    },
    table_box: {
        display: "flex", height: "100%"
    },
    table_paper: {
        width: "100%",
        mb: 2,
        borderRadius: 4,
        boxShadow: "0px 1px 3px 0px rgba(65,65, 65, 0.1)",
        padding: 1,
    },
    table_dataGrid: {
        margin: 1,
        border: "none",
        ".MuiDataGrid-columnHeaderTitle": { fontWeight: "bold" },
    },
    modal_grid: {
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
    modal_button: {
        color: '#62B6E4', border: '1.5px solid'
    },
    modal_box: {
        // display: 'flex',
        // position: 'absolute',
        // alignItems: 'center',
        // width: '100%',
        justifyContent: 'space-between',
        //   border: '1px solid #CFD0D7',
        p: 1
    }
}

export default (styles)