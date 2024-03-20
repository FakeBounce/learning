import { Box, Skeleton } from '@mui/material';

interface ProfileSkeletonProps {
  rows: number;
  cols: number;
}

export const ProfileSkeleton = ({ rows, cols }: ProfileSkeletonProps) => {
  return (
    <Box display="flex" flexDirection="column" px={2}>
      <Box display="flex">
        <Skeleton variant="circular" height={80} width={80} />
      </Box>
      <Box display="flex" flex="1 1 0">
        {[...Array(cols)].map((_, colIndex) => (
          <Box
            key={colIndex}
            display="flex"
            flex="1 1 0"
            flexDirection="column"
            justifyContent="center"
            mt={2}
            gap={4}
          >
            {[...Array(rows)].map((_, rowIndex) => (
              <Skeleton key={rowIndex} variant="text" animation="pulse" width="80%" />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
