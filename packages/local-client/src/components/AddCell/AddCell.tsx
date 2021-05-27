import React from "react";
import { useActions } from "../../hooks/useActions";
import { Button } from "../Button/Button";
import styles from './AddCell.module.scss';
import classNames from 'classnames';

interface AddCellProps {
  forceVisible?: boolean;
  previousCellId: string | null;
}

export const AddCell: React.FC<AddCellProps> = ({
  forceVisible,
  previousCellId,
}) => {
  const { insertCellAfter } = useActions();
  const wrapperClassNames = classNames(
    styles.addCell,
    { [styles.forceVisible]: forceVisible },
  );

  return (
    <div className={wrapperClassNames}>
      <div className={styles.addButtons}>
        <Button
          additionalStyles='button is-rounded is-primary is-small'
          onClick={() => insertCellAfter(previousCellId, 'code')}>
          <span className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
          <span>Code</span>
        </Button>
        <Button
          additionalStyles='button is-rounded is-primary is-small'
          onClick={() => insertCellAfter(previousCellId, 'text')}
        >
          <span className='icon is-small'>
            <i className='fas fa-plus' />
          </span>
          <span>Text</span>
        </Button>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
};