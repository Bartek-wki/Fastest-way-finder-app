class StatusOfStep {
  constructor() {
    const thisStatus = this;

    thisStatus.initStatus();
  }

  initStatus() {
    const thisStatus = this;

    thisStatus.step = {
      stepStatus: 'inactive',
      get changeStep() {
        return this.stepStatus;
      },
      set changeStep(step) {
        this.stepStatus = step;
        this.changeStepListener(step);
      },
      changeStepListener: function () { },
      registerNewListener: function (externalListenerFunction) {
        this.changeStepListener = externalListenerFunction;
      },
    };

  }
}

export default StatusOfStep;