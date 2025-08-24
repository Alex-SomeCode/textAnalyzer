// word.ts

export class Word {
    private _value: string;
    private _indexStart: number;
    private _indexEnd: number;

    constructor(
        value: string,
        indexStart: number,
        indexEnd: number,
    ) {
        this._value = value;
        this._indexStart = indexStart;
        this._indexEnd = indexEnd;
    }

    get value(): string {
        return this._value;
    }

    set value(newValue: string) {
        this._value = newValue;
    }

    get indexStart(): number {
        return this._indexStart;
    }

    set indexStart(newIndex: number) {
        this._indexStart = newIndex
    }


    get indexEnd(): number {
        return this._indexEnd;
    }

    set indexEnd(newIndex: number) {
        this._indexEnd = newIndex
    }




    remove() {
        this._value = '';
        this._indexStart = 0;
        this._indexEnd = 0;
    }
}