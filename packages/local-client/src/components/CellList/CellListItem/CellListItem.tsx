import React from "react";
import { Cell } from "../../../redux";
import { ActionBar } from "../../ActionBar/ActionBar";
import { CodeCell } from "../../CodeCell/CodeCell";
import { TextEditor } from "../../TextEditor/TextEditor";
import styles from './CellListItem.module.scss';

interface CellListItemProps {
  cell: Cell;
}

export const CellListItem: React.FC<CellListItemProps> = ({
  cell
}) => {
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = (
      <>
        <div className={styles.actionBarWrapper}>
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );
  }

  return (
    <div className={styles.cellListItem}>
      {child}
    </div>
  );
};