export const select = {
  templateOf: {
    grid: '#template-grid',
    header: '#template-header',
    button: '#template-button',
  },
  containerOf: {
    pages: '#pages',
    stepHeader: '.step-header',
    buttons: {
      finishDrawing: '#button-one-wrapper',
      compute: '#button-two-wrapper',
      startAgain: '#button-three-wrapper',
    },
    header: '.step-wrapper',
    finderWrapper: '.finder-wrapper',
    grid: '.grid',
    button: '#button-wrapper'
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

export const templates = {
  grid: Handlebars.compile(document.querySelector(select.templateOf.grid).innerHTML),
  header: Handlebars.compile(document.querySelector(select.templateOf.header).innerHTML),
  button: Handlebars.compile(document.querySelector(select.templateOf.button).innerHTML),
};

export const handlebarsData = {
  headerOne: {
    headerId: 'header-one',
    headerTitle: 'DRAW ROUTES'
  },
  headerTwo: {
    headerId: 'header-two',
    headerTitle: 'PICK START AND FINISH'
  },
  headerThree: {
    headerId: 'header-three',
    headerTitle: 'THE BEST ROUTE IS...'
  },
  buttonOne: {
    buttonId: 'button-one',
    buttonTitle: 'FINISH DRAWING'
  },
  buttonTwo: {
    buttonId: 'button-two',
    buttonTitle: 'COMPUTE'
  },
  buttonThree: {
    buttonId: 'button-three',
    buttonTitle: 'START AGAIN'
  },
};
