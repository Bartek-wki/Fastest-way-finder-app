export const select = {
  containerOf: {
    pages: '#pages',
    stepHeader: '.step-header',
    buttons: {
      finishDrawing: '#button-one-wrapper',
      compute: '#button-two-wrapper',
      startAgain: '#button-three-wrapper',
    },
    headers: {
      stepOne: '#header-one-wrapper',
      stepTwo: '#header-two-wrapper',
      stepThree: '#header-three-wrapper',
    },
    finderWrapper: '.finder-wrapper',
  },
  nav: {
    links: '.nav-link',
  },
  grid: {
    grid: '.grid',
    cell: '.cell',
    selectedCell: '.selected-cell',
    startCell: '.start-cell',
    endCell: '.end-cell',
  },
  buttons: {
    finishDrawing: '#button-one',
    compute: '#button-two',
    startAgain: '#button-three',
  },
};

export const classNames = {
  pages: {
    active: 'active-page',
  },
  nav: {
    active: 'active-link',
  },
  step: {
    stepActive: 'step-active',
  },
  grid: {
    selectedCell: 'selected-cell',
    starCell: 'start-cell',
    endCell: 'end-cell',
  }
};

export const globalValue = {
  selectedCell: [],
  grid: [
    [{ state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }],
    [{ state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }],
    [{ state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }],
    [{ state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }],
    [{ state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }],
    [{ state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }],
    [{ state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }],
    [{ state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }],
    [{ state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }],
    [{ state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }, { state: 'block' }],
  ],
  start: [],
  end: [],
};
