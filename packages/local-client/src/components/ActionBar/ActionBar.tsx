import React from "react";
import { useActions } from "../../hooks/useActions";
import { ActionButton } from "../ActionButton/ActionButton";
import styles from './ActionBar.module.scss';

interface ActionBarProps {
  id: string;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  id,
}) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className={styles.actionBar}>
      <ActionButton
        onClick={() => moveCell(id, 'up')}
        iconName='fa-arrow-up'
      />
      <ActionButton
        onClick={() => moveCell(id, 'down')}
        iconName='fa-arrow-down'
      />
      <ActionButton
        onClick={() => deleteCell(id)}
        iconName='fa-times'
      />
    </div>
  );
};