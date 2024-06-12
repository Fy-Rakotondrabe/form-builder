import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  inputDefaultStyle: {
    marginVertical: 2,
  },
  multipleChoice: {
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    marginVertical: 4
  },
  cameraChoice: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  surface: {
    padding: 8,
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center'
  },
  imageView: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
  container: {
    flex: 1
  },
  modalContent: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    padding: '16px 32px 24px',
  },
});
