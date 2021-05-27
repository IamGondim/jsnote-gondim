import React, { useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useCumulativeCode } from '../../hooks/useCumulativeCode';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { Cell } from '../../redux';
import { CodeEditor } from '../CodeEditor/CodeEditor';
import { Preview } from '../Preview/Preview';
import { Resizable } from '../Resizable/Resizable';
import styles from './CodeCell.module.scss';

interface CodeCellProps {
  cell: Cell;
}

export const CodeCell: React.FC<CodeCellProps> = ({
  cell
}) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(state => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode, createBundle]);

  return (
    <Resizable
      direction='vertical'
    >
      <div className={styles.wrapper}>
        <Resizable
          direction='horizontal'
        >
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className={styles.progressWrapper}>
          {
            !bundle || bundle.loading
              ?
              <div className={styles.progressCover}>
                <progress className='progress is-small is-primary' max='100'>
                  Loading
                </progress>
              </div>
              :
              <Preview code={bundle.code} errorMessage={bundle.err} />
          }
        </div>
      </div>
    </Resizable>
  );
};