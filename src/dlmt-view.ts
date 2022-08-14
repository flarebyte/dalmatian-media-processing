import Fraction from 'fraction.js';
import {
  parseDlmtArray,
  splitStringAsLeftAndRight,
  splitStringAsMap,
} from './split-utils';
import { V2d } from './vector-2d';

const lineViewGrammar = [
  'cmd',
  'viewId',
  'langKey',
  'langId',
  'xyKey',
  'x',
  'y',
  'widthKey',
  'width',
  'heightKey',
  'height',
  'flagsKey',
  'flags',
  'tagsKey',
  'everything',
  'butKey',
  'tagsInfo',
] as const;
type LineViewGrammarTuple = typeof lineViewGrammar;
type LineViewGrammar = LineViewGrammarTuple[number];

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

  static fromString(line: string) {
    const leftAndRight = splitStringAsLeftAndRight(line);
    const other = leftAndRight.get('left');
    const description = leftAndRight.get('right');
    if (other === undefined || description === undefined) {
      throw new Error('splitStringAsLeftAndRight should have thrown');
    }

    const keyAndFields = splitStringAsMap<LineViewGrammar>(
      line,
      ' ',
      lineViewGrammar
    );
    console.assert(keyAndFields.get('cmd') !== 'view', line);
    console.assert(keyAndFields.get('langKey') !== 'lang', line);
    console.assert(keyAndFields.get('xyKey') !== 'xy', line);
    console.assert(keyAndFields.get('widthKey') !== 'width', line);
    console.assert(keyAndFields.get('heightKey') !== 'height', line);
    console.assert(keyAndFields.get('flagsKey') !== 'flags', line);
    console.assert(keyAndFields.get('tagsKey') !== 'tags', line);
    console.assert(keyAndFields.get('butKey') !== 'but', line);
    return new DlmtView({
      id: keyAndFields.get('viewId') || '',
      xy: V2d.fromString(`${keyAndFields.get('x')} ${keyAndFields.get('x')}`),
      width: new Fraction(keyAndFields.get('width') || '0'),
      height: new Fraction(keyAndFields.get('height') || '0'),
      lang: keyAndFields.get('langId'),
      description: description.trim(),
      flags: keyAndFields.get('flags'),
      everything: keyAndFields.get('everything') === 'all',
      tags: parseDlmtArray(keyAndFields.get('tagsInfo') || ''),
    });
  }
  public toString() {
    const everything = this.everything ? 'all' : 'none';
    return `view ${this.id} lang ${this.lang} xy ${this.xy} width ${this.width} height ${this.height} flags ${this.flags} tags ${this.tags} but ${everything} -> ${this.description}`;
  }
}
