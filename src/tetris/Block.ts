import { Position } from "./Position";

export abstract class Block {

    protected abstract tiles: Position[][];
    protected startOffset: Position = new Position(0, 0);

    public abstract id: number;

    protected rotationState: number = 0;
    protected abstract offset: Position;

    public getTilePositions() {
        return this.tiles[this.rotationState]
            .map((x) => new Position(x.row + this.offset.row, x.column + this.offset.column))
    }

    public rotateCW() {
        this.rotationState = (this.rotationState + 1) % this.tiles.length
    }

    public rotateCCW() {
        if (this.rotationState == 0) {
            this.rotationState = this.tiles.length - 1;
        }
        else {
            this.rotationState--;
        }
    }

    public move(rows: number, columns: number) {
        this.offset.row += rows;
        this.offset.column += columns;
    }

    public reset(){
        this.rotationState = 0;
        this.offset.row = this.startOffset.row
        this.offset.column = this.startOffset.column
    }

    public getPreviewPosition(){
        return [ ...this.tiles[0]]
    }

}