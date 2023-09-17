// Não usado
import * as React from 'react'
import { Divider, IconButton, Typography } from '@mui/material'
import Menu from '@mui/material/Menu'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import MenuItem from '@mui/material/MenuItem'

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FilterAltIcon sx={{ justifyContent: 'left' }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ boxShadow: '0px 0px 31px -10px rgba(0,0,0,0.05)' }}
        elevation={3}
      >
        <Typography sx={{ marginLeft: 2, color: 'gray' }}>Status</Typography>
        <Divider />
        <MenuItem onClick={handleClose}>Adopted</MenuItem>
        <MenuItem onClick={handleClose}>For Adoption</MenuItem>
      </Menu>
    </div>
  )
}
