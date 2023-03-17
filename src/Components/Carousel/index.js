import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Box } from "@mui/system";
import { useState } from "react";
import data from "../../mockup/image";
import styles from "./styles";
import theme from "../Drawer/theme";

// altura maxima de imagem 450px
const Slider = () => {
  const [current, setCurrent] = useState(0);
  console.log("width", window.innerWidth);

  const nextSlide = () => {
    setCurrent(current === data.length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? data.length - 1 : current - 1);
  };
  const reel = window.innerWidth / 5 + "%";
  console.log("reel", reel);
  return (
    <Box sx={{width:'100%', pt:2, pb:1, display:'flex', justifyContent:'center', minHeight:'150px'}}>
      <div style={{ maxHeight: "400px", width: "95%" }}>
        <div style={styles.slider}>
          <KeyboardArrowLeftIcon style={styles.leftarrow} onClick={prevSlide} />
          <KeyboardArrowRightIcon
            style={styles.rightarrow}
            onClick={nextSlide}
          />
          {data.map((d, index) => {
            return current === index ? (
              <img
                style={{
                  objectFit: "cover",
                  maxHeight: "400px",
                  maxWidth: "100%",
                }}
                src={d.image}
                alt="images"
              />
            ) : null;
          })}
          <Box
            sx={{
              position: "absolute",
              maxHeight: "400px",
              [theme.breakpoints.down("md")]: {
                mt: "47%",
              },
              mt: "360px",
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {data.map((d, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setCurrent(index)}
                  style={{
                    cursor: "pointer",
                    height: "5px",
                    width: "30px",
                    borderRadius: "8px",
                    backgroundColor: current === index ? "#b7dbe8" : "white",
                    margin: 3,
                  }}
                />
              );
            })}
          </Box>
        </div>
      </div>
    </Box>
  );
};
export default Slider;
