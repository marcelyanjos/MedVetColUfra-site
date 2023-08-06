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

export default function BasicAccordion() {
  const [info, setInfo] = useState([]);
  const [show, setShow] = useState(null); // Use null to indicate no accordion is selected

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${API}/sections-hovet?populate=icon`);
      const data = response.data.data.map((hovet) => {
        // Assuming that the 'body' attribute contains image URLs wrapped in <img> tags
        const bodyWithImages = hovet.attributes.body.replace(
          /src="\/uploads/g,
          `src="${Host}/uploads`
        );
        return { ...hovet, attributes: { ...hovet.attributes, body: bodyWithImages } };
      });
      setInfo(data);
    } catch (error) {
      console.error("Error fetching info:", error);
    }
  };
  

  const handleAccordionToggle = (hovetId) => {
    setShow((prevShow) => (prevShow === hovetId ? null : hovetId));
  };

  return (
    <div>
      {info.map((hovet) => (
        <Accordion
          expanded={show === hovet.id} // Check if current accordion should be expanded
          key={hovet.id}
          sx={{
            elevation: 0,
            boxShadow: "none",
            bgcolor: hovet.id % 2 === 0 ? colors.green[5] : colors.green[2],
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
            <Box
              sx={{
                alignItems: "center",
                width: "100%",
                cursor: "default",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: hovet.id % 2 === 0 ? "row-reverse" : "row",
              }}
            >
              <Box sx={{ maxWidth: show === hovet.id ? "100%" : "35vw", flex: show === hovet.id && 1 }}>
                <Typography sx={{ fontSize: '32px', fontWeight: 'bold' }}>{hovet.attributes.titulo}</Typography>
                {show === hovet.id || (
                  <>
                    <Typography sx={{ mb: 2 }}>{hovet.attributes.descricao}</Typography>

                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleAccordionToggle(hovet.id)} // Pass the hovet.id to the handler
                    >
                      Leia mais
                    </Button>
                  </>
                )}
              </Box>
              {hovet.attributes.icon && hovet.attributes.icon.data && show !== hovet.id && (
                <img
                  src={`${Host}${hovet.attributes.icon.data.attributes.url}`}
                  alt="Icone"
                  style={{
                    height: "250px",
                    // width: "100%",
                    objectFit: "cover",
                    marginBottom: 10,
                  }}
                />
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <div dangerouslySetInnerHTML={{ __html: hovet.attributes.body }} />
            {!show || (
              <Button
                color="primary"
                variant="contained"
                onClick={() => handleAccordionToggle(hovet.id)} // Pass the hovet.id to the handler
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