import Fraction from 'fraction.js';
import { V2d } from './vector-2d';

export class DlmtView {
  private _id: string;
  private _xy: V2d;
  private _width: Fraction;
  private _height: Fraction;
  private _everything: boolean;
  private _tags: string[];
  private _flags: string;
  private _lang: string;
  private _description: string;
  constructor({
    id,
    xy,
    width,
    height,
    everything,
    tags,
    flags = 'O',
    lang = 'en',
    description = '',
  }: {
    id: string;
    xy: V2d;
    width: Fraction;
    height: Fraction;
    everything: boolean;
    tags: string[];
    flags?: string;
    lang?: string;
    description?: string;
  }) {
    this._id = id;
    this._xy = xy;
    this._width = width;
    this._height = height;
    this._everything = everything;
    this._tags = tags;
    this._flags = flags;
    this._lang = lang;
    this._description = description;
  }

  public get id(): string {
    return this._id;
  }

  public get xy(): V2d {
    return this._xy;
  }

  public get width(): Fraction {
    return this._width;
  }

  public get height(): Fraction {
    return this._height;
  }

  public get everything(): boolean {
    return this._everything;
  }

  public get tags(): string[] {
    return this._tags;
  }

  public get flags(): string {
    return this._flags;
  }

  public get lang(): string {
    return this._lang;
  }
  public get description(): string {
    return this._description;
  }
}
