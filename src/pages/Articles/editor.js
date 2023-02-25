import React, { useState } from "react";
import {
  Box,
  Button,
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
import { Link, Outlet } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "./textEditor.css";

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

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: Font.whitelist }],
    [{ size: [] }],
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
  const [value, setValue] = useState("");
  const [autor, setAutor] = useState("");
  const [publish, setPublish] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

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
        <Box sx={{ pb: 5, display: "flex", justifyContent: "space-between" }}>
          <Typography
            fontFamily={"Public Sans"}
            fontWeight={700}
            color="#212B36"
            variant="h5"
          >
            Novo Artigo
          </Typography>
        </Box>
        <Paper sx={{ p: 2, height: "100%" }}>
          <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ flex: 1 }}>
              <TextField
                id="standard-basic"
                label="Titulo"
                value={title}
                onChange={setTitle}
                variant="standard"
              />
              <FormControl variant="standard" sx={{ minWidth: 220, ml: 2 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Categoria
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={category}
                  onChange={handleChange}
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
                </Select>
              </FormControl>
            </Box>
            <TextField
              sx={{ ml: 1 }}
              id="standard-basic"
              label="autor"
              disabled
              value={autor}
              variant="standard"
            />
          </Box>
          <ReactQuill
            theme="snow"
            value={value}
            placeholder="Insira seu texto aqui ..."
            style={{
              ".ql-editor": { height: "300px", backgrounColor: "pink" },
            }}
            onChange={setValue}
            formats={formats}
            modules={modules}
          />
          <Box sx={{ display: "flex" }}>
            <Box sx={{ pt: 1, flex: 1 }}>
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
            </Box>
            <Box sx={{ pt: 1, }}>
              <Button
                sx={{ bgcolor: "rgb(179, 232, 255)", mr: 1, color: "#ffffff" }}
              >
                Save
              </Button>
              <Link style={{ backgroundColor: "#fe163c", color: "#ffffff", textDecoration:'none',padding:10, borderRadius:6 }} to='..'>
                Cancel
              </Link>
            </Box>
          </Box>
        </Paper>
    </div>
  );
}
