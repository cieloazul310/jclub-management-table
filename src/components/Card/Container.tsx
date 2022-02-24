import * as React from 'react';
import Box from '@mui/material/Box';

type CardContainerProps = {
  edges: {
    node: {
      value: number;
    };
  }[];
};

function CardContainer({ edges }: CardContainerProps) {
  const width = 600;
  const height = 360;
  const contentWidth = 240;
  const px = Math.max((width - contentWidth) / 2, 5);
  const ref = React.useRef<HTMLDivElement>(null);
  let timer: NodeJS.Timeout;

  React.useEffect(() => {
    const scrollY = window.sessionStorage.getItem('container-scroll');
    if (scrollY && ref.current) {
      const index = parseInt(scrollY, 10);
      ref.current.scrollTo({ left: contentWidth * index, behavior: 'smooth' });
    }
  }, []);

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    clearTimeout(timer);
    const { currentTarget } = event;
    timer = setTimeout(() => {
      const left = currentTarget.scrollLeft;
      if (left % contentWidth !== 0) return;
      console.log(left, left / contentWidth);
      window.sessionStorage.setItem('container-scroll', (left / contentWidth).toString());
    }, 500);
  };

  return (
    <Box width={width} height={height} bgcolor="primary.light" overflow="hidden" position="relative" display="flex">
      <Box
        sx={{
          px: `${px}px`,
          display: 'flex',
          flexDirection: 'row',
          width: 'max-content',
          overflow: 'auto',
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: `${px}px`,
        }}
        ref={ref}
        onScroll={onScroll}
      >
        {edges.map(({ node }, index) => (
          <Box
            key={index.toString()}
            sx={{
              width: contentWidth,
              flexShrink: 0,
              height,
              bgcolor: index % 2 === 0 ? 'secondary.dark' : 'secondary.light',
              p: '20px',
              display: 'flex',
              justifyContent: 'center',
              scrollSnapAlign: 'start',
            }}
          >
            {node.value}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default CardContainer;
