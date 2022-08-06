import * as React from 'react'
import {
    Card,
    Typography,
  } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import EventIcon from "@mui/icons-material/Event";
import { ReactComponent as StethoscopeIcon} from "../../assets/stethoscope_icon.svg";

export default function Card1(){
    return(
        <div>
            <Card
                sx={{
                  minHeight: 425,
                  height: "60%",
                  boxShadow: "0px 1px 3px 0px rgba(65,65, 65, 0.15)",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent:'center',
                }}
              >
                <div>
                  <Avatar
                    alt="Jane Doe"
                    sx={{ width: 140, height: 140 }}
                    src="https://tailwind.ink/static/media/Iliana.613ac608.jpeg"
                  />
                  <IconButton
                    size="small"
                    aria-label="upload picture"
                    component="label"
                    sx={{
                      left: 90,
                      bottom: 30,
                      bgcolor: "#fafcfc",
                      borderWidth: 1,
                      borderColor: "#f6f6f6",
                    }}
                  >
                    <input hidden accept="image/*" type="file" />
                    <EditIcon />
                  </IconButton>
                </div>

                <div
                  style={{
                    width: "80%",
                    marginTop: -10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    color="#212B36"
                    fontWeight={400}
                    sx={{ fontSize: 20, mb: -1 }}
                  >
                    Jane Doe
                  </Typography>
                  <Typography color="#212B36" sx={{ fontSize: 14 }}>
                    {" "}
                    jane.doe
                  </Typography>
                  <div
                    style={{
                      marginTop: 10,
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: -20,
                    }}
                  >
                    <EventIcon />
                    <Typography style={{ marginLeft: 5 }}>
                      01/01/2022
                    </Typography>
                  </div>
                  <div
                    style={{
                      marginTop: 30,
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: -20,
                    }}
                  ><StethoscopeIcon style={{height:24, width:30}}/><Typography fontSize={20} style={{ marginLeft: 5 }}>
                  Médica Veterinaria
                </Typography></div>
                </div>
              </Card>
        </div>
    )
}