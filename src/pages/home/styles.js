import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        flex: 1,
        // height:'100%',
        // maxWidth: '92%',
        // backgroundColor: 'pink',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        display: 'flex',
        flex: 1,
        maxHeight: 120,
        minWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center'
        // justifyContent: 'space-between',
    },
    box: {
        minWidth: 100,
        width: 500,
        margin: 5
        // paddingLeft:10,
        // paddingRight:10,
    },
    container2: {
        display: 'flex',
        alignItems: 'center',
        width: '95%',
        // margin:5,
        justifyContent: 'space-between',
    },
    linechart: {
        height: 300,
        minWidth: 600,
        border: '0.5px solid #C9C9C9',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
});

export { useStyles }