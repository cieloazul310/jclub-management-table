// https://zenn.dev/katahei/scraps/7a52c361329387
import * as React from 'react';

/**
 * 以下のように使用する
 * const handleLongPress = useLongPress(関数, インターバル時間)
 * <button {...handleLongPress}>クリック</button>
 */
export type LongPressSet = {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
};

export default function useLongPress(callback: () => void, ms: number): LongPressSet {
  const [startLongPress, setStartLongPress] = React.useState(false);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (startLongPress) {
      timeout = setTimeout(callback, ms);
    } else {
      clearTimeout(timeout as NodeJS.Timeout);
    }

    return () => {
      clearTimeout(timeout as NodeJS.Timeout);
    };
  }, [startLongPress, callback]);

  const start = () => {
    console.log('start');
    callback();
    setTimeout(() => {
      setStartLongPress(true);
    }, 1000);
  };

  const stop = () => {
    console.log('stop');
    setStartLongPress(false);
  };

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
}
