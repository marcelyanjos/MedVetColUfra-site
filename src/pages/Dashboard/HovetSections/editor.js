import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ReactQuill from "react-quill";
import { Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../../CMS/Context/AuthContext";
import { getToken } from "../../../CMS/Helpers";
import "react-quill/dist/quill.snow.css";
import "./textEditor.css";
import { API, Host } from "../../../CMS/constant";

const fonts = [
  "Arial",
  "Courier New",
  "Georgia",
  "Lucida Sans Unicode",
  "Tahoma",
  "Trebuchet MS",
  "Times New Roman",
  "Verdana",
  "Roboto",
];

function getFontName(font) {
  return font.toLowerCase().replace(/\s/g, "-");
}
var fontNames = fonts.map((font) => getFontName(font));
// add fonts to style
var fontStyles = "";
fonts.forEach(function (font) {
  var fontName = getFontName(font);
  fontStyles +=
    ".ql-snow .ql-picker.ql-font .ql-picker-label[data-value=" +
    fontName +
    "]::before, .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=" +
    fontName +
    "]::before {" +
    "content: '" +
    font +
    "';" +
    "font-family: '" +
    font +
    "', sans-serif;" +
    "}" +
    ".ql-font-" +
    fontName +
    "{" +
    " font-family: '" +
    font +
    "', sans-serif;" +
    "}";
});
var node = document.createElement("style");
node.innerHTML = fontStyles;
document.body.appendChild(node);

const Quill = ReactQuill.Quill;
var Font = Quill.import("formats/font");
Font.whitelist = fontNames;
Quill.register(Font, true);

var Size = Quill.import("attributors/style/size");
Size.whitelist = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px",
  "48px",
];
Quill.register(Size, true);

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: Font.whitelist }],
    [{ size: Size.whitelist }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ script: "sub" }, { script: "super" }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ direction: "rtl" }],
    ["link", "image", "video", "formula"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "color",
  "font",
  "size",
  "formula",
  "bold",
  "italic",
  "underline",
  "strike",
  "background",
  "code",
  "blockquote",
  "list",
  "script",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default function Article() {
  const [category, setCategory] = useState("");
  const [publish, setPublish] = useState(false);
  const { id } = useParams();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(!id);
  const [formData, setFormData] = useState({
    titulo: "",
    ilustracao: null,
    ilustracaoPreview: null,
    descricao: "",
    autor: "",
    body: "",
  });
  const history = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `${API}/artigos/${id}?populate=ilustracao`
        );
        console.log("Resultado do GET:", response.data);

        const articleData = response.data?.data?.attributes || {};

        setFormData((prevData) => ({
          ...prevData,
          titulo: articleData.titulo || "",
          ilustracao: articleData.ilustracao || null,
          ilustracaoPreview:
            articleData.ilustracao &&
            articleData.ilustracao.data &&
            articleData.ilustracao.data.attributes &&
            articleData.ilustracao.data.attributes.url
              ? `${Host}${articleData.ilustracao.data.attributes.url}`
              : null,
          descricao: articleData.descricao || "",
          autor: articleData.autor || "",
          body: articleData.body || "",
        }));
        setIsLoading(false);
        console.log(setFormData.ilustracao);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    if (id) {
      fetchArticle();
    } else {
      setIsLoading(false); // Defina isLoading como false se o id não estiver presente
    }
  }, [id]);

  const handleFormChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setFormData((prevData) => ({
          ...prevData,
          ilustracao: file,
        }));

        const reader = new FileReader();
        reader.onload = () => {
          setFormData((prevData) => ({
            ...prevData,
            ilustracaoPreview: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        console.error("O arquivo selecionado não é uma imagem.");
      }
    }
  };

  const handleEditorChange = (value) => {
    const modifiedValue = value.replace(
      /src="\/uploads/g,
      `src="${Host}/uploads`
    );
    setFormData((prevData) => ({
      ...prevData,
      body: modifiedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("files.ilustracao", formData.ilustracao);
      form.append(
        "data",
        JSON.stringify({
          titulo: formData.titulo,
          descricao: formData.descricao,
          autor: formData.autor,
          body: formData.body,
        })
      );

      const authToken = getToken();
      const headers = {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      };

      const config = {
        headers: headers,
      };

      if (id) {
        await axios.put(
          `${API}/artigos/${id}?populate=ilustracao`,
          form,
          config
        );
        console.log("Artigo editado com sucesso!");
      } else {
        await axios.post(`${API}/artigos`, form, config);
        console.log("Artigo adicionado com sucesso!");
      }

      setFormData({
        titulo: "",
        ilustracao: null,
        ilustracaoPreview: null,
        descricao: "",
        autor: user?.username || "",
        body: "",
      });

      history("/articles");
    } catch (error) {
      console.error("Erro ao enviar o artigo:", error);
    }
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePublish = () => {
    console.log("setPublish");
    if (publish == true) {
      setPublish(false);
    } else setPublish(true);
  };

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <Typography variant="h3">Loading...</Typography>
        </div>
      ) : (
        <Container>
          <Box sx={{ pb: 5, display: "flex", justifyContent: "space-between" }}>
            <Typography
              fontFamily={"Public Sans"}
              fontWeight={700}
              color="#212B36"
              variant="h5"
            >
              {id ? "Editar" : "Adicionar"} Artigo
            </Typography>
          </Box>
          <Paper sx={{ p: 2, height: "100%" }}>
            <form onSubmit={handleSubmit}>
              <Box
                sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}
              >
                <Box sx={{ flex: 1 }}>
                  <TextField
                    id="standard-basic"
                    label="Titulo"
                    value={formData.titulo}
                    sx={{ width: "60%" }}
                    onChange={handleFormChange}
                    variant="standard"
                  />
                  {/* <TextField select variant="standard" id="categoria" sx={{ minWidth: 220, ml: 2 }}
                      value={formData.category}
                      onChange={handleFormChange}
                      label="Categoria"
                    >
                      <MenuItem value="">
                        <em>Nenhum</em>
                      </MenuItem>
                      <MenuItem value={"Dicas de cuidados"}>
                        Dicas de cuidados
                      </MenuItem>
                      <MenuItem value={"Noticias"}>Noticias</MenuItem>
                      <MenuItem value={"Doenças e sintomas"}>
                        Doenças e sintomas
                      </MenuItem>
                    </TextField> */}
                </Box>
                <TextField
                  sx={{ ml: 1 }}
                  id="standard-basic"
                  label="autor"
                  disabled
                  value={user?.username || ""}
                  variant="standard"
                />
              </Box>
              <Box>
              <Typography variant="subtitle1">Ilustração:</Typography>
              <input
                type="file"
                name="ilustracao"
                onChange={handleFileChange}
              />
              {formData.ilustracaoPreview && (
                <img
                  src={formData.ilustracaoPreview}
                  alt="Ilustração"
                  style={{ height: "300px", marginBottom: 10 }}
                />
              )}
            </Box>
            <Typography variant="subtitle1">Conteúdo:</Typography>
              <ReactQuill
                theme="snow"
                value={formData.body}
                placeholder="Insira seu texto aqui ..."
                style={{
                  ".ql-editor": { height: "300px", backgrounColor: "pink" },
                }}
                onChange={handleEditorChange}
                formats={formats}
                modules={modules}
              />
              <Box sx={{ display: "flex" }}>
                {/* <Box sx={{ pt: 1, flex: 1 }}>
                  <Button
                    onClick={handlePublish}
                    sx={{
                      bgcolor: publish ? "#38d472" : "#c1c1c1",
                      mr: 1,
                      color: "#ffffff",
                    }}
                  >
                    {publish ? "Publicar" : "Rascunho"}
                  </Button>
                </Box> */}
                <Box sx={{ pt: 1 }}>
                  <Button
                    type="submit"
                    sx={{
                      bgcolor: "rgb(179, 232, 255)",
                      mr: 1,
                      color: "#ffffff",
                    }}
                  >
                    Save
                  </Button>
                  <Link
                    style={{
                      backgroundColor: "#fe163c",
                      color: "#ffffff",
                      textDecoration: "none",
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
  );
}
