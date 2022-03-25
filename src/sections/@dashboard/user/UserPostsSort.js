import PropTypes from 'prop-types';
// material
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

UserPostsSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func
};

export default function UserPostsSort({ options, onSort, value }) {
  return (
    <TextField sx={{ width: '95%' }} select size="small" value={value} onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
