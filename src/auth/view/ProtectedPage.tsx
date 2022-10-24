import { Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';

export const ProtectedPage: React.FC = observer(() => {
  return (
    <Typography
      sx={{
        width: 400,
        height: 300,
      }}
    >
      Your profile data. First name. Last Name. Age. Lectures: lecture 1,
      lecture 6, lecture 7
    </Typography>
  );
});
