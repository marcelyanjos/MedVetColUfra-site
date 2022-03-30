import PropTypes from 'prop-types';
// material
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

MedicinePostsSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func
};

export default function MedicinePostsSort({ options, onSort, value }) {
  return (
    <TextField sx={{ width: '100%' }} select size="small" value={value} onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
