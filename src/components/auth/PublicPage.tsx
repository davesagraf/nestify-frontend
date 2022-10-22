import { Box, Typography, } from '@mui/material';

export const PublicPage: React.FC = () => {
  return (
    <>
    <Box component={'div'} sx={{width: 400, height: 300}}> 
    <Typography sx={{
      width: 400,
      height: 30
    }}>Welcome to nestify!</Typography>
    </Box>
    </>
  )
};
