import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Host } from '../../../CMS/constant'
import { getHovetId, populateHovet } from '../../../services/cms'
import './textEditor.css'

const fonts = [
  'Arial',
  'Courier New',
  'Georgia',
  'Lucida Sans Unicode',
  'Tahoma',
  'Trebuchet MS',
  'Times New Roman',
  'Verdana',
  'Roboto',
]

function getFontName(font) {
  return font.toLowerCase().replace(/\s/g, '-')
}
const fontNames = fonts.map((font) => getFontName(font))
// add fonts to style
let fontStyles = ''
fonts.forEach(function (font) {
  const fontName = getFontName(font)
  fontStyles +=
    '.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=' +
    fontName +
    ']::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=' +
    fontName +
    ']::before {' +
    "content: '" +
    font +
    "';" +
    "font-family: '" +
    font +
    "', sans-serif;" +
    '}' +
    '.ql-font-' +
    fontName +
    '{' +
    " font-family: '" +
    font +
    "', sans-serif;" +
    '}'
})
const node = document.createElement('style')
node.innerHTML = fontStyles
document.body.appendChild(node)

const Quill = ReactQuill.Quill
const Font = Quill.import('formats/font')
Font.whitelist = fontNames
Quill.register(Font, true)

const Size = Quill.import('attributors/style/size')
Size.whitelist = [
  '10px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '28px',
  '32px',
  '36px',
  '48px',
]
Quill.register(Size, true)

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: Font.whitelist }],
    [{ size: Size.whitelist }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ script: 'sub' }, { script: 'super' }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ direction: 'rtl' }],
    ['link', 'image', 'video', 'formula'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const formats = [
  'header',
  'color',
  'font',
  'size',
  'formula',
  'bold',
  'italic',
  'underline',
  'strike',
  'background',
  'code',
  'blockquote',
  'list',
  'script',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

export default function Article() {
  // const [category, setCategory] = useState('')
  const [publishedAtDate, setPublishedAtDate] = useState(null)
  const { id } = useParams()
  // const { user } = useAuthContext()
  const [isLoading, setIsLoading] = useState(!id)
  const [formData, setFormData] = useState({
    titulo: '',
    subtitulo: '',
    icon: null,
    iconPreview: null,
    descricao: '',
    autor: '',
    body: '',
    publishedAt: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      getHovetId(setFormData, id, setIsLoading, setPublishedAtDate)
    } else {
      setIsLoading(false) // Defina isLoading como false se o id não estiver presente
    }
  }, [id])

  const handleFormChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.type.startsWith('image/')) {
        setFormData((prevData) => ({
          ...prevData,
          icon: file,
        }))

        const reader = new FileReader()
        reader.onload = () => {
          setFormData((prevData) => ({
            ...prevData,
            iconPreview: reader.result,
          }))
        }
        reader.readAsDataURL(file)
      } else {
        console.error('O arquivo selecionado não é uma imagem.')
      }
    }
  }

  const handleEditorChange = (value) => {
    const modifiedValue = value.replace(
      /src="\/uploads/g,
      `src="${Host}/uploads`,
    )
    setFormData((prevData) => ({
      ...prevData,
      body: modifiedValue,
    }))
    console.log(formData.body)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await populateHovet(navigate, formData, setFormData, publishedAtDate, id)
  }

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
          <Typography variant="h3">Loading...</Typography>
        </div>
      ) : (
        <Container>
          <Box sx={{ pb: 5, display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              fontFamily={'Public Sans'}
              fontWeight={700}
              color="#212B36"
              variant="h5"
            >
              {id ? 'Editar' : 'Adicionar'} Seção
            </Typography>
          </Box>
          <Paper sx={{ p: 2, height: '100%' }}>
            <form onSubmit={handleSubmit}>
              <Box
                sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}
              >
                <Box sx={{ flex: 1 }}>
                  <TextField
                    id="standard-basic"
                    label="Titulo"
                    name="titulo"
                    value={formData.titulo}
                    sx={{ width: '60%' }}
                    onChange={handleFormChange}
                    variant="standard"
                  />
                </Box>
                <TextField
                  sx={{ ml: 1 }}
                  id="standard-basic"
                  label="Subtitulo"
                  name="subtitulo"
                  value={formData.subtitulo}
                  onChange={handleFormChange}
                  variant="standard"
                />
              </Box>
              <Box>
                <Typography variant="subtitle1">Icone:</Typography>
                <input type="file" name="icone" onChange={handleFileChange} />
                {formData.iconPreview && (
                  <img
                    src={formData.iconPreview}
                    alt="icone"
                    style={{ height: '300px', marginBottom: 10 }}
                  />
                )}
              </Box>
              <Box>
                <Typography>Descrição</Typography>
                <TextField
                  size="small"
                  name="descricao"
                  fullWidth
                  id="standard-basic"
                  value={formData.descricao}
                  onChange={handleFormChange}
                />
              </Box>
              <Typography variant="subtitle1">Conteúdo:</Typography>
              <ReactQuill
                theme="snow"
                value={formData.body}
                placeholder="Insira seu texto aqui ..."
                style={{
                  '.ql-editor': { height: '300px', backgrounColor: 'pink' },
                }}
                onChange={handleEditorChange}
                formats={formats}
                modules={modules}
              />
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ pt: 1, flex: 1 }}>
                  <Button
                    onClick={() =>
                      setPublishedAtDate((date) => (date ? null : new Date()))
                    }
                    sx={{
                      bgcolor: publishedAtDate ? '#38d472' : '#c1c1c1',
                      mr: 1,
                      color: '#ffffff',
                    }}
                  >
                    {publishedAtDate ? 'Publicar' : 'Rascunho'}
                  </Button>
                </Box>
                <Box sx={{ pt: 1 }}>
                  <Button
                    type="submit"
                    sx={{
                      bgcolor: 'rgb(179, 232, 255)',
                      mr: 1,
                      color: '#ffffff',
                    }}
                  >
                    Save
                  </Button>
                  <Link
                    style={{
                      backgroundColor: '#fe163c',
                      color: '#ffffff',
                      textDecoration: 'none',
                      padding: 10,
                      borderRadius: 6,
                    }}
                    to=".."
                  >
                    Cancel
                  </Link>
                </Box>
              </Box>
            </form>
          </Paper>
        </Container>
      )}
    </div>
  )
}
