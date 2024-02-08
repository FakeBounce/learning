import { Trans } from '@lingui/macro';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { getOrganisationsList } from '@redux/reducers/organisationsReducer';
import { LMSCard } from '@src/components/lms';
import ActionButton from '@src/components/lms/ActionButton.tsx';
import theme from '@theme';
import { PATH_ORGANISATIONS } from '@utils/navigation/paths.ts';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2)
  }
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(name: string, code: string, population: number, size: number): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767)
];

export default function OrganisationsList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const organisationsList = useAppSelector((state) => state.organisations.organisationsList);
  console.log('organisationsList', organisationsList);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(
      getOrganisationsList({
        currentPage: 1,
        rowsPerPage: 10
      })
    );
  }, []);

  return (
    <Box px={[0, 2]} width="100%" sx={{ overflowX: 'hidden' }}>
      <LMSCard isPageCard>
        <Box px={3} height="10vh" display="flex" width="100%" alignItems="center" position="sticky">
          <Typography variant="h5">
            <Trans>Organisations</Trans>
          </Typography>
          <ActionButton
            sx={{ textTransform: 'none', ml: 2 }}
            onClick={() => {
              navigate(PATH_ORGANISATIONS.add);
            }}
          >
            <Trans>Créer</Trans>
          </ActionButton>
        </Box>
        <Box
          sx={{
            maxWidth: '100%',
            maxHeight: '68vh',
            height: '100%',
            padding: 0,
            position: 'relative',
            overflowX: ['hidden', 'scroll']
          }}
        >
          <TableContainer sx={{ maxHeight: '61vh' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead sx={{ position: 'sticky' }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: theme.palette.grey[200],
                        height: '3vh'
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ height: '6vh', position: 'sticky', right: 0 }}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </LMSCard>
    </Box>
  );
}
