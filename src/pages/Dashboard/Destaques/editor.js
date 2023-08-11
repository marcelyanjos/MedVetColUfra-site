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
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../../CMS/Context/AuthContext";
import { getToken } from "../../../CMS/Helpers";
import { API, Host } from "../../../CMS/constant";

export default function Article() {
  const [category, setCategory] = useState("");
  const [publishedAtDate, setPublishedAtDate] = useState(null);
  const { id } = useParams();
  const { user } = useAuthContext();
  const [files, setFiles] = useState([]);
  const [newImage, setNewImage] = useState(true);
  const [isLoading, setIsLoading] = useState(!id);
  const [formData, setFormData] = useState({
    titulo: "",
    imagem: null,
    imagemPreview: null,
    conteudo: null,
    conteudoPreview: null,
    link: "",
    ordem: "",
    publishedAt: "",
  });
  const history = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `${API}/destaques/${id}?populate=imagem`
        );

        const articleData = response.data?.data?.attributes || {};

        setFormData((prevData) => ({
          ...prevData,
          titulo: articleData.titulo || "",
          imagem: articleData.imagem || null,
          imagemPreview:
            articleData.imagem &&
            articleData.imagem.data &&
            articleData.imagem.data.attributes &&
            articleData.imagem.data.attributes.url
              ? `${Host}${articleData.imagem.data.attributes.url}`
              : null,
          link: articleData.link || "",
          conteudoPreview:
            articleData.conteudo &&
            articleData.conteudo.data &&
            articleData.conteudo.data.attributes &&
            articleData.conteudo.data.attributes.url
              ? `${Host}${articleData.conteudo.data.attributes.url}`
              : null,
          ordem: articleData.ordem || "",
          publishedAt: articleData.publishedAt || "",
        }));
        setPublishedAtDate(
          articleData.publishedAt ? new Date(articleData.publishedAt) : null
        );
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    if (id) {
      fetchArticle();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleFormChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "imagem" && file.type.startsWith("image/")) {
        setFormData((prevData) => ({
          ...prevData,
          imagem: file,
        }));

        const reader = new FileReader();
        reader.onload = () => {
          setFormData((prevData) => ({
            ...prevData,
            imagemPreview: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      } else if (type === "conteudo") {
        setFormData((prevData) => ({
          ...prevData,
          conteudo: file,
          conteudoPreview: URL.createObjectURL(file),
        }));
      } else {
        console.error("Tipo de arquivo não suportado.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("files.imagem", formData.imagem);
      if (formData.conteudo) {
        form.append("files.conteudo", formData.conteudo);
      }
      form.append(
        "data",
        JSON.stringify({
          titulo: formData.titulo,
          link: formData.link,
          publishedAt: publishedAtDate,
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
          `${API}/destaques/${id}?populate=imagem`,
          form,
          config
        );
        console.log("Seção editada com sucesso!");
      } else {
        await axios.post(`${API}/destaques`, form, config);
        console.log("Seção adicionada com sucesso!");
      }

      setFormData({
        titulo: "",
        link: "",
        imagem: null,
        imagemPreview: null,
        conteudo: null,
        conteudoPreview: null,
        publishedAt: "",
      });

      history("/admin/dashboard/destaque");
    } catch (error) {
      console.error("Erro ao enviar a seção:", error);
    }
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
        <Box>
          <Box sx={{ pb: 5, display: "flex", justifyContent: "space-between" }}>
            <Typography
              fontFamily={"Public Sans"}
              fontWeight={700}
              color="#212B36"
              variant="h5"
            >
              {id ? "Editar" : "Adicionar"} Seção
            </Typography>
          </Box>
          <Paper sx={{ p: 3, height: "100%" }}>
            <form onSubmit={handleSubmit}>
              <Box
                sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}
              >
                <TextField
                  id="standard-basic"
                  label="Titulo"
                  name="titulo"
                  value={formData.titulo}
                  sx={{ flex: 1 }}
                  onChange={handleFormChange}
                  variant="standard"
                />
              </Box>
              <Box>
                <Typography variant="subtitle1">Imagem:</Typography>
                <input
                  type="file"
                  name="imagem"
                  onChange={(e) => handleFileChange(e, "imagem")}
                />
                {formData.imagemPreview && (
                  <img
                    src={formData.imagemPreview}
                    alt="imagem"
                    style={{ height: "300px", marginBottom: 10 }}
                  />
                )}
              </Box>
              <Box>
                <Typography>Link</Typography>
                <TextField
                  size="small"
                  name="link"
                  fullWidth
                  maxRows={4}
                  id="standard-basic"
                  value={formData.link}
                  onChange={handleFormChange}
                />
              </Box>
              <Box>
                <Typography>Conteúdo:</Typography>
                <input
                  type="file"
                  name="conteudo"
                  onChange={(e) => handleFileChange(e, "conteudo")}
                />
                {formData.conteudoPreview && (
                  <div>
                    <Typography>Conteúdo Pré-visualizado:</Typography>
                    <iframe
                      src={formData.conteudoPreview}
                      title="Conteúdo Pré-visualizado"
                      style={{ width: "100%", height: "300px" }}
                    />
                  </div>
                )}
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ pt: 1, flex: 1 }}>
                  <Button
                    onClick={() =>
                      setPublishedAtDate((date) =>
                        date ? null : new Date()
                      )
                    }
                    sx={{
                      bgcolor: publishedAtDate ? "#38d472" : "#c1c1c1",
                      mr: 1,
                      color: "#ffffff",
                    }}
                  >
                    {publishedAtDate ? "Publicar" : "Rascunho"}
                  </Button>
                </Box>
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
        </Box>
      )}
    </div>
  );
}