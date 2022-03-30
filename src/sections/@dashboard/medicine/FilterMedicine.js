import * as React from 'react';
import Button from '@mui/material/Button';
import { Divider, IconButton, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Iconify from '../../../components/Iconify';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Iconify icon="bx:filter-alt" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <Typography sx={{ marginLeft: 2, color: 'gray' }}>Status</Typography>
        <Divider />
        <MenuItem onClick={handleClose}>Adopted</MenuItem>
        <MenuItem onClick={handleClose}>For Adoption</MenuItem>
      </Menu>
    </div>
  );
}
