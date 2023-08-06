import React, { useState } from "react";
import { Box, Paper, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export default function Example(){
  const [currentItem, setCurrentItem] = useState(0);

  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!"
    },
    {
      name: "Random Name #2",
      description: "Hello World!"
    }
  ];

  console.log("currentItem: ", currentItem);

  return (
    <Box sx={{width:'95%'}}>
      <Carousel
        timeout={0}
        animation
        autoPlay
        index={currentItem}
        navButtonsAlwaysVisible
        next={(next, active) => setCurrentItem(next)}
        prev={(prev, active) => setCurrentItem(prev)}
        indicators
        height={'60vh'}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>

      {/* <Box display="flex" flexDirection="row">
        {items.map((item, i) => (
          <Item
            key={i}
            item={item}
            bg={currentItem === i ? "red" : "grey"}
            onClick={() => setCurrentItem(i)}
          />
        ))}
      </Box> */}
    </Box>
  );
};

function Item({ item, bg, ...rest }) {
  return (
    <Paper
      elevation={0}
      sx={{ p:3, backgroundColor: bg }}
      {...rest}
    >
      <h2>{item.name}</h2>
      <p>{item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}