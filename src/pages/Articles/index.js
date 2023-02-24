import React, { useState } from "react";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Article() {
  const [value, setValue] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
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

  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div>
      <Container maxWidth="x1">
        <Box sx={{ pb: 5, display: "flex", justifyContent: "space-between" }}>
          <Typography
            fontFamily={"Public Sans"}
            fontWeight={700}
            color="#212B36"
            variant="h5"
          >
            Artigos
          </Typography>
        </Box>
        <Paper sx={{ p: 1 }}>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            formats={formats}
            modules={modules}
          />
          <Box sx={{pt:1}}>
            <Button sx={{ bgcolor: "rgb(179, 232, 255)", mr:1 }}>Save</Button>
            <Button sx={{ bgcolor: "#fe163c" }}>Cancel</Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
