import { LinearProgress, linearProgressClasses} from "@mui/material";
import { styled } from '@mui/material/styles';

export const BorderLinearProgress = styled(LinearProgress)(() => ({
    height: 10,
    width: "100%",
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#8F9099",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: "#EFF0FA",
    },
  }));