import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default function Grid (props) {

  const {
    theme,
    classes,
    row,
    nested,
    col,
    s,
    m,
    l,
    xl,
    offset,
    className,
    children,
    ...etc
  } = props;

  const isRow = row && !col;
  const isCol = !row && col;
  const isRowCol = row && col;

  // Grid is either row or col. If both are provided the row is taken
  // so the child is a col.
  const baseClass = row ? classes.row : classes.col;

  const colClasses = {
    [classes['s' + s]]: s,
    [classes['m' + m]]: m,
    [classes['l' + l]]: l,
    [classes['xl' + xl]]: xl,
  };

  offset.forEach(rule => {
    colClasses[classes['offset-' + rule]] = true;
  });

  const cls = cx(
    baseClass,
    isRow && nested && [classes.nested],
    isCol && colClasses,
    className
  );

  return (
    <div className={cls} {...etc}>
      {isRowCol ? (
        <div className={cx(classes.col, colClasses)}>
          {children}
        </div>
      ) : children}
    </div>
  );
}

Grid.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,

  /**
   * If component is a row.
   */
  row: PropTypes.bool,

  /**
   * If row is nested inside another one.
   */
  nested: PropTypes.bool,

  /**
   * If component is a column.
   */
  col: PropTypes.bool,

  /**
   * The number of columns in small breakpoint.
   */
  s: PropTypes.number,

  /**
   * The number of columns in medium breakpoint.
   */
  m: PropTypes.number,

  /**
   * The number of columns in large breakpoint.
   */
  l: PropTypes.number,

  /**
   * The number of columns in extra large breakpoint.
   */
  xl: PropTypes.number,

  /**
   * A list of offset definitions for each breakpoint.
   * Example: `['m4', 'l2']` creates an offset of 4 columns
   * on medium breakpoint and an offset of 2 columns on large breakpoint.
   */
  offset: PropTypes.arrayOf(PropTypes.string),
};

Grid.defaultProps = {
  offset: [],
};