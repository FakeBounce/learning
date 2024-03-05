import { InputBase } from '@mui/material';
import { styled } from '@mui/system';
import Iconify from '@src/components/iconify/Iconify';
import Box from '@mui/material/Box';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'white'
  },
  marginRight: theme.spacing(2),
  marginLeft: 8,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));

// @Todo: Rework this component when the functionnality will be clear
export default function HeaderRightContent() {
  return (
    <Box display="flex" alignItems="center">
      <Search>
        <SearchIconWrapper>
          <Iconify icon="material-symbols:search" />
        </SearchIconWrapper>
        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
      </Search>
      <Iconify icon="ion:notifcations" />
    </Box>
  );
}
