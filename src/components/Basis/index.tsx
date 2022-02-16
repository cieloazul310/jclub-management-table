import * as React from 'react';
import Box from '@mui/material/Box';

export function ContentBasis({ children }: React.PropsWithChildren<Record<string, unknown>>) {
  return <Box py={2}>{children}</Box>;
}

export function ContentBasisLarge({ children }: React.PropsWithChildren<Record<string, unknown>>) {
  return <Box py={4}>{children}</Box>;
}
