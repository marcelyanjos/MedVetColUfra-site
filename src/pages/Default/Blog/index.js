import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  IconButton,
  InputBase,
  MenuItem,
  Pagination,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import blog from "../../../mockup/blog";
import styles from "./styles";
import colors from "../../../colors";
export default function Blog() {
  const [filteredList, setFilteredList] = React.useState(blog);
  const [value, setValue] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  // concat arrays categoria from array blog
  const merge = [].concat.apply(
    [],
    blog.map((i) => i.categoria)
  );
  // remove duplicated items from categoria
  const unique = [...new Set(merge)];

  useEffect(() => {
    const changeTableData = () => {
      let x = blog.filter((item, idx) => {
        // total items per page = 5
        if (idx >= 5 * (page - 1) && idx <= 5 * (page - 1) + 4) return item;
      });

      setFilteredList(x);
    };
    changeTableData();
  }, [page]);

  const filterBySearch = (event) => {
    // Input
    const query = event.target.value;
    // array complete
    var updatedList = [...blog];
    // search
    updatedList = updatedList.filter((item) => {
      return item.titulo.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(updatedList);
  };

  // não funciona
  const filterByCategory = (event) => {
    setValue(event.target.value);
    console.log("setValue", setValue);
    var updatedList = [...blog];
    updatedList = updatedList.filter((item) => {
      return item.categoria.indexOf(setValue) !== -1;
    });
    setFilteredList(updatedList);
  };

  return (
    <Box onClick={handleClose} sx={styles.body}>
      <Box sx={styles.content}>
        <Box sx={styles.filters}>
          <Typography sx={styles.title}>Blog</Typography>
          <Box component="form" sx={styles.searchBar}>
            <InputBase
              onChange={filterBySearch}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Pesquisar"
              inputProps={{ "aria-label": "Pesquisar" }}
            />
            <SearchIcon
              sx={{ p: "10px", color: "#a1a1a1" }}
              aria-label="search"
            />
          </Box>
          <IconButton
            type="button"
            ref={anchorRef}
            aria-label="filter"
            onClick={handleToggle}
            sx={styles.iconFilter}
          >
            <FilterAltIcon />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            // transition
            disablePortal
          >
            <Paper>
              {unique.map((i, index) => {
                return (
                  <MenuItem key={index} onClick={() => filterByCategory(i)}>
                    {i}
                  </MenuItem>
                );
              })}
            </Paper>
          </Popper>
        </Box>
        <Box sx={styles.cardsBody}>
          {filteredList.map((i, index) => {
            return (
              <Card key={index} elevation={4} sx={styles.card}>
                <Box sx={{ height: "250px" }}>
                  <img
                    src={i.image}
                    alt={i.titulo}
                    style={{
                      height: "250px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Typography component={"span"} variant={"body2"} sx={{ p: 2 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{
                        color: "#5B8FF9",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      {i.categoria.join(", ")}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#5B8FF9",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      {i.datapub}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 20,
                      height: "50px",
                      lineHeight: 1.25,
                      mt: 1,
                      "&:first-letter": {
                        textTransform: "uppercase",
                      },
                    }}
                  >
                    {i.titulo}
                  </Typography>
                  <Button
                    sx={{
                      mt: 1,
                      fontSize: 12,
                      bgcolor: colors.green[3],
                      color: "#ffffff",
                      fontWeight: "bold",
                      "&:hover": {
                        bgcolor: colors.green[4],
                      },
                    }}
                  >
                    Leia mais
                  </Button>
                </Typography>
              </Card>
            );
          })}
        </Box>
      </Box>
      <Pagination
        sx={{ mt: -4, mb: 2 }}
        // numero de paginas
        count={page.length}
        page={page}
        onChange={handleChange}
      />
    </Box>
  );
}
