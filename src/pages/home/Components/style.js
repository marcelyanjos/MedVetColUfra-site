import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    bar: {
        margin:5, height: 400, width: '95%', border: '0.5px solid #C9C9C9', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex',
    },
    pie:{
        // height: 300,
        minWidth:100,
        height:300,
        border: '0.5px solid #C9C9C9',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin:5
    },
    box: {
        flexGrow: 1,
        paddingLeft: 10,
        paddingRight: 10,
    }
});

export { useStyles }