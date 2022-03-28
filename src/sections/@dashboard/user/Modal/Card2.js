// colocar if e else para adicionar mais imagens, caso imagem adicionada >0 e <5
// colocar if e else text caso quantidades de imagens >5
// colocar wrap
import { Button, IconButton } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Iconify from '../../../../components/Iconify';

const card2 = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  //   position: 'absolute',
  alignItems: 'center',
  width: '49.5%',
  height: '100%',
  border: '1px solid #CFD0D7',
  borderRadius: '4px',
  p: 2
};
const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '30%',
  width: '100%',
  // padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function DropzoneComponent(props) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );
  }, []);

  const remove = (file) => {
    const newFiles = [...files]; // make a var for the new array
    newFiles.splice(file, 1); // remove the file from the array
    setFiles(newFiles); // update the state
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/jpg',
    maxFiles: 5
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    isDragActive,
    isDragReject,
    isDragAccept
  );

  const thumbs = files.map((file) => (
    <div
      key={file.name}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center'
      }}
    >
      {files.length < 2 ? (
        <img
          src={file.preview}
          alt={file.name}
          style={{
            width: '40%',
            display: 'flex',
            alignContent: 'center'
          }}
        />
      ) : (
        <img
          src={file.preview}
          alt={file.name}
          style={{
            width: 68,
            display: 'flex',
            alignContent: 'center'
          }}
        />
      )}
    </div>
  ));

  const fileArchive = files.map((file) => (
    <div
      key={file.name}
      style={{
        display: 'flex',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        key={file.name}
        style={{
          display: 'flex',
          width: '100%',
          alignContent: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#E3ECFF',
          borderRadius: 5
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', margin: 8 }}>
          <Iconify icon="codicon:symbol-file" sx={{ fontSize: 42 }} />
          <p>{file.name}</p>
        </div>
        <IconButton
          onClick={() => {
            remove(file.name);
          }}
        >
          <Iconify icon="ei:trash" sx={{ fontSize: 30, color: '#EB5757' }} />
        </IconButton>
      </div>
    </div>
  ));

  // clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div style={card2}>
      <div
        style={{
          height: '98%',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          // alignContent: 'center',
          justifyContent: 'space-around'
        }}
      >
        <aside>{thumbs}</aside>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Iconify icon="ant-design:cloud-upload-outlined" sx={{ fontSize: 42 }} />
            <p>Drag and drop your images here.</p>
          </div>
        </div>
        <aside>{fileArchive}</aside>
      </div>
    </div>
  );
}

export default DropzoneComponent;
