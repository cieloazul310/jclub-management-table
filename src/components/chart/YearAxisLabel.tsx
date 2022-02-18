import * as React from 'react';
import Box from '@mui/material/Box';
import { ArgumentAxis } from '@devexpress/dx-react-chart';
import useIsMobile from '../../utils/useIsMobile';

function YearAxisLabel({ text, x, y, dy, textAnchor }: ArgumentAxis.LabelProps): JSX.Element {
  const isMobile = useIsMobile();
  return (
    <Box
      component="text"
      sx={{
        fill: 'text.secondary',
        fontFamily: 'typography.fontFamily',
        fontSize: 12,
        fontWeight: 400,
        bgcolor: 'background.paper',
      }}
      x={x}
      y={y}
      dy={dy}
      textAnchor={textAnchor}
    >
      {typeof text === 'number' || !isMobile ? text : text.slice(-2)}
    </Box>
  );
}

export default YearAxisLabel;
