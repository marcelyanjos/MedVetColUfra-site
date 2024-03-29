// colocar if e else para adicionar mais imagens, caso imagem adicionada >0 e <5
// colocar if e else text caso quantidades de imagens >5
// colocar wrap
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import { Grid, IconButton } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const card2 = {
  height: '100%',
  border: '1px solid #CFD0D7',
  borderRadius: '4px',
  p: 2,
}
const baseStyle = {
  cursor: 'pointer',
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
  transition: 'border .3s ease-in-out',
}

const activeStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

function DropzoneComponent(props) {
  const [files, setFiles] = useState([])

  // Ver imagem anexada
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    )
  }, [])

  // Excluir imagem da fila
  const remove = (file) => {
    const newFiles = [...files] // make a var for the new array
    newFiles.splice(file, 1) // remove the file from the array
    setFiles(newFiles) // update the state
  }

  // Tipos e quantidade de imagens aceitas no Drag 'n' Drops
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/jpg',
    maxFiles: 1,
  })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  )

  // Mapa para renderizar tamanho exibido em caso de quantidade de imagens
  const thumbs = files.map((file) => (
    <div
      key={file.name}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      {files.length < 2 ? (
        <img
          src={file.preview}
          alt={file.name}
          style={{
            width: '40%',
            display: 'flex',
            alignContent: 'center',
          }}
        />
      ) : (
        <img
          src={file.preview}
          alt={file.name}
          style={{
            width: 68,
            display: 'flex',
            alignContent: 'center',
          }}
        />
      )}
    </div>
  ))

  // Mapa de lista de nome de imagens renderizando caso quantidade
  const fileArchive = files.map((file) => (
    <div
      key={file.name}
      style={{
        display: 'flex',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      {files.length < 2 ? (
        <div
          key={file.name}
          style={{
            display: 'flex',
            width: '100%',
            alignContent: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#E3ECFF',
            borderRadius: 5,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', margin: 8 }}>
            <InsertDriveFileOutlinedIcon sx={{ fontSize: 42 }} />
            <p>{file.name}</p>
          </div>
          <IconButton
            onClick={() => {
              remove(file.name)
            }}
          >
            <DeleteOutlineIcon sx={{ fontSize: 30, color: '#EB5757' }} />
          </IconButton>
        </div>
      ) : (
        <div
          key={file.name}
          style={{
            display: 'flex',
            width: '100%',
            alignContent: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#E3ECFF',
            borderRadius: 5,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: 8,
              marginRight: 8,
            }}
          >
            <InsertDriveFileOutlinedIcon sx={{ fontSize: 42 }} />
            <p>{file.name}</p>
          </div>
          <IconButton
            onClick={() => {
              remove(file.name)
            }}
          >
            <DeleteOutlineIcon sx={{ fontSize: 30, color: '#EB5757' }} />
          </IconButton>
        </div>
      )}
    </div>
  ))

  // clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview))
    },
    [files],
  )

  return (
    <Grid xs={42} sm={5.95} ls={12} sx={card2} container>
      <div
        style={{
          height: '98%',
          width: '95%',
          display: 'flex',
          flexDirection: 'column',
          // alignContent: 'center',
          justifyContent: 'space-around',
        }}
      >
        {/* Drag 'n' Drops or manual */}
        <aside>{thumbs}</aside>
        {files.length === 0 && (
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <div
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CloudUploadOutlinedIcon sx={{ fontSize: 42 }} />
              <p>Drag and drop your images here.</p>
            </div>
          </div>
        )}

        <aside>{fileArchive}</aside>
      </div>
    </Grid>
  )
}

export default DropzoneComponent
