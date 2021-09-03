import OnOff from "onoff";

export default class Motors {
  constructor(lfPin, lbPin, rfPin, rbPin) {
    this.leftForward = new OnOff.Gpio(lfPin, "out");
    this.leftBackward = new OnOff.Gpio(lbPin, "out");
    this.rightForward = new OnOff.Gpio(rfPin, "out");
    this.rightBackward = new OnOff.Gpio(rbPin, "out");
  }

  write(lf, lb, rf, rb) {
    this.leftForward.writeSync(lf);
    this.leftBackward.writeSync(lb);
    this.rightForward.writeSync(rf);
    this.rightBackward.writeSync(rb);
  }

  forward() {
    this.write(1, 0, 1, 0);
  }

  backward() {
    this.write(0, 1, 0, 1);
  }

  left() {
    this.write(0, 1, 1, 0);
  }

  right() {
    this.write(1, 0, 0, 1);
  }

  stop() {
    this.write(0, 0, 0, 0);
  }
}
