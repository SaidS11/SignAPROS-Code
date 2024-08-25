/* eslint-disable prettier/prettier */
import './CrearConfiguracion.css';
import Button from '@mui/material/Button';
import {
  styleButtonBiggerGreen, styleButtonBiggerRed
} from '../VerPaciente/ButtonStyle';

export interface CraerConfigMultiProps {
  onClickBack: () => void;
  onClickUpload: () => void;
}

const CrearConfiguracionMultimedia = (props: CraerConfigMultiProps) => {
  const { onClickBack, onClickUpload } = props;
  const variable = "EMG's"
  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType.startsWith('video/')) {
        // Es un archivo de video, puedes manejarlo aquí.
        console.log('Archivo de video seleccionado:', selectedFile);
      } else {
        // No es un archivo de video, muestra un mensaje de error o realiza alguna acción.
        console.log('Error: Debes seleccionar un archivo de video.');
      }
    }
  };
    return (
        <div>
          <section className="display-center">
            <h1>Select media</h1>
          </section>
          <section className="display-center">
            <h3>Video:</h3>
          </section>
          <label htmlFor="video-upload" className="drop-container"
            onDrop={e => handleDrop(e)}
            onDragOver={e => handleDragOver(e)}
            onDragEnter={e => handleDragEnter(e)}
            onDragLeave={e => handleDragLeave(e)}
            onChange={handleFileChange} >
            <span className="drop-title">Drop a video here</span>
            or
            <input lang="en" id="video-upload" type="file" accept='.mp4, .mov, .avi, .mkv, .webm, .wmv' required />
          </label>
          <section className="display-center">
            <h3>Image:</h3>
          </section>
          <label htmlFor="file-upload" className="drop-container"
            onDrop={e => handleDrop(e)}
            onDragOver={e => handleDragOver(e)}
            onDragEnter={e => handleDragEnter(e)}
            onDragLeave={e => handleDragLeave(e)} >
            <span className="drop-title">Drop an image here</span>
            or
            <input type="file" id="file-upload" accept='.jpg, .png, .jpeg' required />
          </label>
          {/* <section className="display-center">
            <h3>Video:</h3>
          </section>
          <section className="display-center">
            <input type="file" id="video-upload" accept='.mp4, .mov, .avi, .mkv, .webm, .wmv' />
          </section>
          <section className="display-center">
            <h3>Imagen:</h3>
          </section>
          <section className="display-center">
            <input type="file" id="file-upload" accept='.jpg, .png, .jpeg' />
          </section> */}
          <br />
          <section className='display-center'>
            <Button sx={styleButtonBiggerGreen} style={{marginTop: '10px', fontSize: '20px'}} onClick={onClickUpload}>Create</Button>
          </section>
          <section className='display-center'>
            <Button sx={styleButtonBiggerRed} style={{marginTop: '10px', fontSize: '20px'}} onClick={onClickBack}>Cancel</Button>
          </section>
          <br/>
        </div>
      );
};

export default CrearConfiguracionMultimedia;
