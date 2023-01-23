import Fraction from 'fraction.js';
import { assertMapValueEquals } from './assertion.js';
import {
  parseDlmtArray,
  splitStringAsLeftAndRight,
  splitStringAsMap,
  toDlmtArray,
} from './split-utils.js';
import { V2d } from './vector-2d.js';

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

    const fields = splitStringAsMap<LineViewGrammar>(
      other,
      ' ',
      lineViewGrammar
    );
    assertMapValueEquals<LineViewGrammar>(fields, 'cmd', 'view', line);
    assertMapValueEquals<LineViewGrammar>(fields, 'langKey', 'lang', line);
    assertMapValueEquals<LineViewGrammar>(fields, 'xyKey', 'xy', line);
    assertMapValueEquals<LineViewGrammar>(fields, 'widthKey', 'width', line);
    assertMapValueEquals<LineViewGrammar>(fields, 'heightKey', 'height', line);
    assertMapValueEquals<LineViewGrammar>(fields, 'flagsKey', 'flags', line);
    assertMapValueEquals<LineViewGrammar>(fields, 'tagsKey', 'tags', line);
    assertMapValueEquals<LineViewGrammar>(fields, 'butKey', 'but', line);

    return new DlmtView({
      id: fields.get('viewId') || '',
      xy: V2d.fromString(`${fields.get('x')} ${fields.get('y')}`),
      width: new Fraction(fields.get('width') || '0'),
      height: new Fraction(fields.get('height') || '0'),
      lang: fields.get('langId'),
      description: description.trim(),
      flags: fields.get('flags'),
      everything: fields.get('everything') === 'all',
      tags: parseDlmtArray(fields.get('tagsInfo') || ''),
    });
  }
  public toString() {
    const everything = this.everything ? 'all' : 'none';
    return `view ${this.id} lang ${this.lang} xy ${
      this.xy
    } width ${this.width.toFraction()} height ${this.height.toFraction()} flags ${
      this.flags
    } tags ${everything} but ${toDlmtArray(this.tags, ', ')} -> ${
      this.description
    }`;
  }
  public acceptTags(){
    
  }
}
