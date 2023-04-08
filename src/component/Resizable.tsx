import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

import './resizable.scss';

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [windowLength, setWindowLength] = useState({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timer: any;
    const resizeListener = () => {
      if (timer) {
        clearTimeout(timer);
      } 
      timer = setTimeout(() => {
        setWindowLength({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
        const maxWidth = window.innerWidth * 0.75;
        if (maxWidth < width) {
          setWidth(maxWidth);
        }
      }, 100)
    }
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let resizableProps: ResizableBoxProps;
  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      width,
      height: Infinity,
      resizeHandles: ['e'],
      minConstraints: [windowLength.innerWidth * 0.2, Infinity],
      maxConstraints: [windowLength.innerWidth * 0.75, Infinity],
      onResizeStop: (e, data) => {
        setWidth(data.size.width);
      },
    }
  } else {
    resizableProps = {
      width: Infinity,
      height: 300,
      resizeHandles: ['s'],
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, windowLength.innerHeight * 0.9],
    }
  }
  return (
    <ResizableBox { ...resizableProps }>
      {children}
    </ResizableBox>
  )
}

export default Resizable;