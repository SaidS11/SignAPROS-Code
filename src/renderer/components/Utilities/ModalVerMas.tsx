/* eslint-disable global-require */
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: '50%',
  // heigth: '20%',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  color: 'black',
};
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  width: '100%',
}));
export interface ModalProps {
  toggleModalVerMas: any;
  open: boolean;
  tipo: string;
  scroll: any;
}
export default function ModalVerMas(props: ModalProps) {
  const { toggleModalVerMas, open, tipo, scroll } = props;
  /*   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); */

  return (
    <div>
      <BootstrapDialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={toggleModalVerMas}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={scroll === 'paper'}>
          <section className="display-center">
            {tipo === 'Tree' && (
              <img
                src={require('../../../pythonScripts/Tree.png')}
                width="50%"
                alt="Arbol"
              />
            )}
            <img
              src={require('../../../pythonScripts/Confusion.png')}
              width="50%"
              alt="Confusion"
            />
          </section>
          {/* <section className="display-center">
            <h1>Información Acerca de los Datos</h1>
          </section>
          <section className="display-center">
            <img
              src={require('../../../pythonScripts/Boxplot.png')}
              width="40%"
              alt="BoxPlot"
            />
            <img
              src={require('../../../pythonScripts/Correlation.png')}
              width="40%"
              alt="Correlation"
            />
          </section>
          <section className="display-center">
            <img
              src={require('../../../pythonScripts/Histogram.png')}
              width="40%"
              alt="Histogram"
            />
            <img
              src={require('../../../pythonScripts/Violin.png')}
              width="40%"
              alt="Violin"
            />
          </section> */}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
