import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.transparent',
  background: 'none',
  // boxShadow: 24,
  outline: 'none',
  p: 4,
  textAlign: 'center',
};
export default function Loading() {
  return (
    <div>
      <Modal open>
        <Box sx={style}>
          <CircularProgress color="secondary" />
        </Box>
      </Modal>
    </div>
  );
}
// display: 'flex', justifyContent: "center", verticalAlign: "middle"
