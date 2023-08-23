import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { API, Host } from "../../../CMS/constant";
import axios from "axios";
import { Box, Container, Button } from "@mui/material"; // Import the Button component from Material-UI
import colors from "../../../colors";
import theme from "../../../Components/theme";

export default function BasicAccordion() {
  const [info, setInfo] = useState([]);
  const [show, setShow] = useState(null); // Use null to indicate no accordion is selected

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${API}/sections-canil?populate=icon`);
      setInfo(response.data.data);
    } catch (error) {
      console.error("Error fetching info:", error);
    }
  };

  const handleAccordionToggle = (canilId) => {
    setShow((prevShow) => (prevShow === canilId ? null : canilId));
  };

  return (
    <div>
      {info.map((canil) => (
        <Accordion
          expanded={show === canil.id} // Check if current accordion should be expanded
          key={canil.id}
          sx={{
            elevation: 0,
            boxShadow: "none",
            bgcolor: canil.id % 2 === 0 ? colors.green[5] : colors.green[2],
            "&.Mui-expanded": { margin: 0 },
            p: 4,
          }}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              cursor: "default",
              "&:hover:not(.Mui-disabled)": { cursor: "default" },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  alignItems: "center",
                  width: "100%",
                  cursor: "default",
                  display: "flex",
                  [theme.breakpoints.down("sd")]: {
                    flexDirection: "column",
                  },
                  justifyContent: "space-between",
                  flexDirection: canil.id % 2 === 0 ? "row-reverse" : "row",
                }}
              >
                <Box
                  sx={{
                    [theme.breakpoints.down("sd")]: {
                      maxWidth: "100%",
                    },
                    maxWidth: show === canil.id ? "100%" : "35vw",
                    flex: show === canil.id && 1,
                  }}
                >
                  <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
                    {canil.attributes.titulo}
                  </Typography>
                  {show === canil.id || (
                    <>
                      <Typography sx={{ mb: 2 }}>
                        {canil.attributes.descricao}
                      </Typography>
                    </>
                  )}
                </Box>
                {canil.attributes.icon &&
                  canil.attributes.icon.data &&
                  show !== canil.id && (
                    <Box
                      sx={{
                        [theme.breakpoints.up("sm")]: {
                          maxHeight: "80%",
                          maxWidth: "100%",
                        },
                      }}
                    >
                      <img
                        src={`${Host}${canil.attributes.icon.data.attributes.url}`}
                        alt="Icone"
                        style={{
                          minWidth: "300px",
                          maxWidth: "350px",
                          objectFit: "cover",
                          marginBottom: 10,
                        }}
                      />
                    </Box>
                  )}
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  [theme.breakpoints.up("sd")]: {
                    justifyContent:
                      canil.id % 2 === 0 ? "flex-end" : "flex-start",
                  },
                }}
              >
                <Button
                  sx={{
                    bgcolor: colors.green[5],
                    "&:hover": {
                      bgcolor:
                        canil.id % 2 === 0 ? colors.green[7] : colors.green[5],
                    },
                  }}
                  variant="contained"
                  onClick={() => handleAccordionToggle(canil.id)} // Pass the canil.id to the handler
                >
                  Leia mais
                </Button>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <div dangerouslySetInnerHTML={{ __html: canil.attributes.body }} />
            {!show || (
              <Button
                color="primary"
                variant="contained"
                onClick={() => handleAccordionToggle(canil.id)} // Pass the canil.id to the handler
              >
                Fechar
              </Button>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
