import React from "react";
import classNames from 'classnames';
import styles from './ActionButton.module.scss';

interface ActionButtonProps {
  onClick: () => void;
  iconName: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  iconName,
  onClick,
}) => {
  const buttonClassNames = classNames(
    'button is-primary is-small',
    styles.button,
  );

  return (
    <button
      className={buttonClassNames}
      onClick={onClick}
    >
      <span className='icon'>
        <i className={`fas ${iconName}`} />
      </span>
    </button>
  );
};