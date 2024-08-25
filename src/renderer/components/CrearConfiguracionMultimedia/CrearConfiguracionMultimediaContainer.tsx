/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-inner-declarations */
/* eslint-disable prettier/prettier */
import AWS from 'aws-sdk';
import { useNavigate } from 'react-router-dom';
import CrearConfiguracionMultimedia from './CrearConfiguracionMultimedia';
import { setErrorDetails, setFallosAlCargar, setIsLoading, setIsUploadedS3 } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch , useCustomSelector } from '../../../redux/hooks';
import { ConfigurationInterface, apiEndpoint } from '../Utilities/Constants';

/* const bucketName = 'piediabe-modular';
const bucketRegion = 'us-west-1';
const IdentityPoolIdP = 'us-west-1:248d5035-efbc-4aea-b6a8-4ce21b5427c9';

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolIdP,
  }),
});
*/
const CrearConfiguracionMultimediaContainer = () => {
  const navigate = useNavigate();
  const loggedUser = useCustomSelector((state) => state.login.loggedUser);
  console.log('key to upload ', loggedUser)
  const primerConfig = useCustomSelector((state) => state.config.configPrimerPaso) as ConfigurationInterface;
  console.log(primerConfig);
  const appDispatch = useCustomDispatch();

  const fileName = '';
  let fileNameVideo = '';

  const onClickBack = () => {
    navigate('/CrearConfiguracion');
  };

  const insertConfiguration = async(fileNameImagen: string, fileNameVideo: string) => {
    const configurationBody = {
      nombre: primerConfig.nombreConfig,
      gsr: primerConfig.gsr,
      frecuencia_cardiaca: primerConfig.frecuencia,
      temperatura: primerConfig.temperatura,
      emgs: primerConfig.canales,
      acelerometro: primerConfig.acelerometro,
      subido: "1",
      descripcion: primerConfig.descripcion,
      arduinos: primerConfig.arduinos
    }
    const insertConf = await fetch(`${apiEndpoint}/insertarConfiguracion`, {
      method: 'POST',
      body: JSON.stringify(configurationBody),
      headers: {'Content-Type': 'application/json'}
    });
    if (insertConf.status === 500){
      // alert("Error al copiar los archivos: " + response.statusText);
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails(`Problem while trying to add the configuration: ${  insertConf.statusText}`));
      return;
    } 
    const multimediaObj = {
      nombre: "Multimedia",
      link_video: fileNameVideo,
      link_imagen: fileNameImagen,
      subido: "1",
      configuracion: primerConfig.nombreConfig
    }
    console.log("MultiOBj", multimediaObj);
    const insertMultimedia = await fetch(`${apiEndpoint}/insertarMultimedia`, {
      method: 'POST',
      body: JSON.stringify(multimediaObj),
      headers: {'Content-Type': 'application/json'}
    });
    if (insertMultimedia.status === 500){
      // alert("Error al copiar los archivos: " + response.statusText);
      appDispatch(setFallosAlCargar(true));
      appDispatch(setErrorDetails(`Problem while adding the multimedia: ${  insertMultimedia.statusText}`));
      
    }

  }

  const onClickUpload = async () => {
    const imgObj = document.getElementById(
      'file-upload'
    ) as HTMLInputElement | null;
    const videoObj = document.getElementById(
      'video-upload'
    ) as HTMLInputElement | null;

    if (imgObj !== null && videoObj!== null) {
      if (imgObj.value !== '' && videoObj.value!== '') {
        // console.log(imgObj.value)
        // appDispatch(setIsLoading(true));
        /*
        const s3 = new AWS.S3({
          apiVersion: '2006-03-01',
          params: { Bucket: bucketName },
        });
        // Image
        let { files } = imgObj;
        const file = files![0];
        const fileName = file.name;
        const filePath = ``;
        fileImagenDB = ``
        const params = {
          Bucket: '',
          Key: ,
          Body: ,
          ACL: '',
        };
        s3.upload(params, function (err: any, res: any) {
          if (err) {
            // alert(err);
            appDispatch(setFallosAlCargar(true));
          } else {
            // alert('Successfully uploaded data img');
            appDispatch(setIsUploadedS3(true));
          }
        });
        // Video
        files = videoObj.files;
        const fileVideo = files![0];
        const fileNameVideo = fileVideo.name;
        const filePathVideo = `}`;
        fileVideoDB = ``
        const paramsVideo = {
          Bucket: '',
          Key: ,
          Body: ,
          ACL: '',
        };
        s3.upload(paramsVideo, function (err: any, res: any) {
          if (err) {
            appDispatch(setIsLoading(false));
            // alert(err);
            appDispatch(setFallosAlCargar(true));
          } else {
            appDispatch(setIsLoading(false));
            appDispatch(setIsUploadedS3(true));
            // alert('Successfully uploaded data Video');
            insertConf(primerConfig);

          }
        }); */
        const {files} = imgObj
        const file = files![0]
        const fileNameImagen = file.name
        const rutaImagen = file.path
        console.log("RUTA imagen", rutaImagen);
        console.log("Filename imagen", fileNameImagen);
        const datosImagen = {
          ruta: rutaImagen,
          fileName: fileNameImagen
        }
      
        const files2 = videoObj.files
        const file2 = files2![0]
        fileNameVideo = file2.name
        const rutaVideo = file2.path
        console.log("RUTA VIDEO", rutaVideo);
        console.log("Filename VIDEO", fileNameVideo)
        const datosVideo = {
          ruta: rutaVideo,
          fileName: fileNameVideo
        }

        appDispatch(setIsLoading(true));
        const response = await fetch(`${apiEndpoint}/moverArchivos`, {
          method: 'POST',
          body: JSON.stringify(datosImagen),
          headers: {'Content-Type': 'application/json'}
        });

        const response2 = await fetch(`${apiEndpoint}/moverArchivos`, {
          method: 'POST',
          body: JSON.stringify(datosVideo),
          headers: {'Content-Type': 'application/json'}
        });
        console.log("Resp 1", response);
        console.log("Resp 2", response2);

        appDispatch(setIsLoading(false));
        if (response.status === 500){
          // alert("Error al copiar los archivos: " + response.statusText);
          appDispatch(setFallosAlCargar(true));
          appDispatch(setErrorDetails(`Problem while copying the files: ${  response.statusText}`))
        } else if (response2.status === 500) { 
          appDispatch(setFallosAlCargar(true));
          appDispatch(setErrorDetails(`Problem while copying the files: ${  response2.statusText}`))
          // alert("Error al copiar los archivos: " + response2.statusText);
        } else {
          // insertConf(primerConfig);
          appDispatch(setIsLoading(true));
          await insertConfiguration(fileNameImagen, fileNameVideo);
          appDispatch(setIsLoading(false));
          navigate('/verConfiguracion');
        }
      }
      else {
        console.log("DISPATCH");
        appDispatch(setFallosAlCargar(true));
        appDispatch(setErrorDetails('Select the right files'));
      }

      // async function insertConf(data: any) {
      //   appDispatch(setIsLoading(true));
      //   window.Bridge.insertConfiguracion(data.nombreConfig, data.gsr, data.frecuencia, data.ritmo, data.canales, data.acelerometro, "1", data.descripcion );
      // }
      // window.Bridge.insertC((event: any, resp: any) => {
      //   if (resp.length > 0) {
      //     console.log('si es', resp);
      //   } else {
      //     console.log('nada');
      //   }
      //   appDispatch(setIsLoading(false));
      //   insertFiles(fileNameVideo, fileName, primerConfig);
      // });

      // async function insertFiles(link_video: string, link_img: string, data: any) {
      //   appDispatch(setIsLoading(true));
      //   window.Bridge.insertMultimedia("Multimedia", link_video, link_img, "1", data.nombreConfig );
      // }
      // window.Bridge.insertM((event: any, resp: any) => {
      //   if (resp.length > 0) {
      //     console.log('si es', resp);
      //   } else {
      //     console.log('nada');
      //   }
      //   appDispatch(setIsLoading(false));
      //   navigate('/verConfiguracion');
      // });


      /* appDispatch(setIsLoading(true));
      const s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: bucketName },
      });
      const { files } = imgObj;
      const file = files![0];
      const fileName = file.name;
      const filePath = ``;
      const params = {
        Bucket: 'piediabe-modular',
        Key: filePath,
        Body: file,
        ACL: 'public-read',
      };
      s3.upload(params, function (err: any, res: any) {
        if (err) {
          appDispatch(setIsLoading(false));
          alert(err);
        } else {
          appDispatch(setIsLoading(false));
          alert('Successfully uploaded data to myBucket/myKey');
        }
      }); */
    }
    else {
      console.log("DISPATCH");
        appDispatch(setFallosAlCargar(true));
        appDispatch(setErrorDetails('Select the right files'));
    }
  };
  return <CrearConfiguracionMultimedia onClickBack={onClickBack} onClickUpload={onClickUpload} />;
};

export default CrearConfiguracionMultimediaContainer;
