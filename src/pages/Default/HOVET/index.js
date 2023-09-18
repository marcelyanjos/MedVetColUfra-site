import { Box, Button } from '@mui/material' // Import the Button component from Material-UI
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API, Host } from '../../../CMS/constant'
import theme from '../../../Components/theme'
import colors from '../../../styles/colors'

export default function BasicAccordion() {
  const [info, setInfo] = useState([])
  const [show, setShow] = useState(null) // Use null to indicate no accordion is selected

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`${API}/sections-hovet?populate=icon`)
      const data = response.data.data.map((hovet) => {
        // Assuming that the 'body' attribute contains image URLs wrapped in <img> tags
        const bodyWithImages = hovet.attributes.body.replace(
          /src="\/uploads/g,
          `src="${Host}/uploads`,
        )
        return {
          ...hovet,
          attributes: { ...hovet.attributes, body: bodyWithImages },
        }
      })
      setInfo(data)
    } catch (error) {
      console.error('Error fetching info:', error)
    }
  }

  const handleAccordionToggle = (hovetId) => {
    setShow((prevShow) => (prevShow === hovetId ? null : hovetId))
  }

  return (
    <div>
      {info.map((hovet) => (
        <Accordion
          expanded={show === hovet.id} // Check if current accordion should be expanded
          key={hovet.id}
          sx={{
            elevation: 0,
            boxShadow: 'none',
            bgcolor: hovet.id % 2 === 0 ? colors.green[5] : '#fcfcfc',
            '&.Mui-expanded': { margin: 0 },
            p: 4,
          }}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              cursor: 'default',
              '&:hover:not(.Mui-disabled)': { cursor: 'default' },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  alignItems: 'center',
                  width: '100%',
                  cursor: 'default',
                  display: 'flex',
                  [theme.breakpoints.down('sd')]: {
                    flexDirection: 'column',
                  },
                  justifyContent: 'space-between',
                  flexDirection: hovet.id % 2 === 0 ? 'row-reverse' : 'row',
                }}
              >
                <Box
                  sx={{
                    [theme.breakpoints.down('sd')]: {
                      maxWidth: '100%',
                    },
                    maxWidth: show === hovet.id ? '100%' : '35vw',
                    flex: show === hovet.id && 1,
                  }}
                >
                  <Typography sx={{ fontSize: '32px', fontWeight: 'bold' }}>
                    {hovet.attributes.titulo}
                  </Typography>
                  {show === hovet.id || (
                    <>
                      <Typography sx={{ mb: 2 }}>
                        {hovet.attributes.descricao}
                      </Typography>
                    </>
                  )}
                </Box>
                {hovet.attributes.icon &&
                  hovet.attributes.icon.data &&
                  show !== hovet.id && (
                    <Box
                      sx={{
                        [theme.breakpoints.up('sm')]: {
                          maxHeight: '80%',
                          maxWidth: '100%',
                        },
                      }}
                    >
                      <img
                        src={`${Host}${hovet.attributes.icon.data.attributes.url}`}
                        alt="Icone"
                        style={{
                          flex: 1,
                          minWidth: '300px',
                          maxWidth: '350px',
                          objectFit: 'cover',
                          marginBottom: 10,
                        }}
                      />
                    </Box>
                  )}
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  [theme.breakpoints.up('sd')]: {
                    justifyContent:
                      hovet.id % 2 === 0 ? 'flex-end' : 'flex-start',
                  },
                }}
              >
                <Button
                  sx={{
                    bgcolor: colors.green[7],
                    '&:hover': {
                      bgcolor:
                        hovet.id % 2 === 0 ? colors.green[7] : colors.green[5],
                    },
                  }}
                  variant="contained"
                  onClick={() => handleAccordionToggle(hovet.id)} // Pass the hovet.id to the handler
                >
                  Leia mais
                </Button>
              </Box>
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
  )
}
