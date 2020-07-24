// An RGB/hex color class that contains useful methods for translating color formats.

type RGBObject = {
  r: number;
  g: number;
  b: number;
  a: number;
};
/**
 * @todo Implement opacity
 */
export default class Color {
  public r: number | undefined;
  public g: number | undefined;
  public b: number | undefined;
  public a: number | undefined;

  static RGB_COLOR_REGEX = /\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d*.\d*))?\)/;

  constructor();
  constructor(colorStr?: string);
  constructor(r?: string | number, g?: number, b?: number);
  constructor(r?: string | number, g?: number, b?: number, a?: number) {
    if (typeof r === "string") {
      r = r.trim();
      if (r.indexOf("#") === 0) {
        r = r.substr(r.indexOf("#") + 1);
        this.r = parseInt(r.substr(0, 2), 16);
        this.g = parseInt(r.substr(2, 2), 16);
        this.b = parseInt(r.substr(4, 2), 16);
      } else if (r.indexOf("rgb") === 0) {
        const res = Color.RGB_COLOR_REGEX.exec(r);
        if (res === null) {
          console.warn("Invalid color");
          return;
        }
        this.r = parseInt(res![1], 10);
        this.g = parseInt(res![2], 10);
        this.b = parseInt(res![3], 10);
        this.a = res![5] ? parseFloat(res![5]) : 1;
      }
    } else {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a || 1;
    }
  }

  /**
   * A helper method that converts an RGB color value to a Hex color value.
   * @param r Red.
   * @param g Green.
   * @param b Blue.
   * @returns A Hex color value string.
   */
  static RGBtoHex(r: number, g: number, b: number): string {
    const componentToHex = (c: number): string => {
      const hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    };
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  /**
   * A helper method that converts a Hex color value to an RGB color value.
   * @param hex A hex color value string.
   * @returns An object representing an RGB color value. Has `r`, `g`, `b`, and `a` properties.
   */
  static HexToRGB(hex: string): RGBObject | null {
    const parseFloat = (str: string): number | null => {
      let float: number = 0,
        int: number = 0,
        multi: number = 0,
        sign: number,
        exp: number,
        mantissa: string;
      if (/^0x/.exec(str)) {
        int = parseInt(str, 16);
      } else {
        for (var i = str.length - 1; i >= 0; i -= 1) {
          if (str.charCodeAt(i) > 255) {
            console.warn("Wrong string parameter");
            return null;
          }
          int += str.charCodeAt(i) * multi;
          multi *= 256;
        }
      }
      sign = int >>> 31 ? -1 : 1;
      exp = ((int >>> 23) & 0xff) - 127;
      mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
      for (i = 0; i < mantissa.length; i += 1) {
        float += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0;
        exp--;
      }
      return float * sign;
    };
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(
      hex
    );
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
          a: parseFloat(result[4]) || 1,
        }
      : null;
  }

  /**
   * Returns a Hex string representation of this Color object.
   * @returns A Hex color value string.
   */
  getHex(): string {
    function componentToHex(c: number | undefined) {
      if (c === undefined) {
        return "00";
      }
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
    return "#" + componentToHex(this.r) + componentToHex(this.g) + componentToHex(this.b);
  }

  /**
   * Returns an RGB string representation of this Color object.
   * @returns An RGB color value string.
   */
  getRGB(): string {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  /**
   * Returns an RGBA string representation of this Color object.
   * @returns An RGBA color value string.
   */
  getRGBA(): string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  /**
   * Sets the RGBA values of this Color object to the supplied RGBA parameters.
   * @param r Red.
   * @param g Green.
   * @param b Blue.
   * @param a Alpha. Defaults to 1.
   */
  setRGB(r: number, g: number, b: number, a: number = 1): void {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a || 1;
  }

  /**
   * Sets the RGBA values of this Color object to the supplied hex string.
   * @param hex A hex color value string.
   */
  setHex(hex: string): void {
    let _hex: string = hex.trim();
    _hex = hex.substr(hex.indexOf("#") + 1);
    this.r = parseInt(_hex.substr(0, 2), 16);
    this.g = parseInt(_hex.substr(2, 2), 16);
    this.b = parseInt(_hex.substr(4, 2), 16);
  }
}