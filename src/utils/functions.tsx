const orientationToDegrees = (orientation: string):number => {
    switch (orientation) {
      case 'N':
        return 0;
      case 'E':
        return 90;
      case 'S':
        return 180;
      case 'W':
        return 270;
      default: 
        return 0
    }
  }

const degreesToOrientation = (degrees: number):string => {
    switch (degrees) {
      case 0:
        return 'N';
      case 90:
        return 'E';
      case 180:
        return 'S';
      case 270:
        return 'W';
      default: 
        return 'N'
    }
}

const validateInput = (regex: RegExp, value: string):boolean => value === "" || regex.test(value);

export {orientationToDegrees, degreesToOrientation, validateInput};