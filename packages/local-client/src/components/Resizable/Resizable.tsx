import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.scss';
import styles from './Resizable.module.scss';
import { useEffect, useState } from 'react';
import { getMaxWidth } from './utils/getMaxWidth';

interface ResizableProps {
  /**
   * Resizing direction.
   * default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
}

export const Resizable: React.FC<ResizableProps> = ({
  direction = 'horizontal',
  children
}) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(getMaxWidth(window.innerWidth));

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (getMaxWidth(window.innerWidth) < width) {
          setWidth(getMaxWidth(window.innerWidth));
        }
      }, 50);
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    }
  }, [width]);

  let resizableBoxProps: ResizableBoxProps;
  if (direction === 'vertical') {
    resizableBoxProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      minConstraints: [Infinity, innerHeight * .1],
      maxConstraints: [Infinity, innerHeight * .9],
    };
  } else {
    resizableBoxProps = {
      className: styles.resizeHorizontal,
      height: Infinity,
      width,
      resizeHandles: ['e'],
      minConstraints: [innerWidth * .1, Infinity],
      maxConstraints: [getMaxWidth(innerWidth), Infinity],
      onResizeStop(event, data) {
        setWidth(data.size.width);
      }
    }
  }

  return (
    <ResizableBox {...resizableBoxProps}>
      {children}
    </ResizableBox>
  );
}