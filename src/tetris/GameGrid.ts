export class GameGrid {

    private readonly _grid: number[][];

    private _rows: number;
    private _columns: number;

    public constructor(rows: number, columns: number) {
        this._rows = rows;
        this._columns = columns;

        this._grid = [];

        for (let i = 0; i < rows; i++) {
            this._grid.push([])
            for (let j = 0; j < columns; j++) {
                this._grid[i].push(0);
            }
        }

        // this._grid = [
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         2,
        //         3,
        //         4,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         1,
        //         2,
        //         3,
        //         1,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ],
        //     [
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0,
        //         0
        //     ]
        // ]
    }

    public isInside(r: number, c: number): boolean {
        return c >= 0 && c < this.columns && r >= 0 && r < this.rows
    }
    public isEmpty(r: number, c: number): boolean {
        return this.isInside(r, c) && this.grid[r][c] == 0;
    }

    public isRowFull(r: number): boolean {
        for (let c = 0; c < this.columns; c++) {
            if (this.grid[r][c] == 0) {
                return false
            }
        }
        return true;
    }
    public isRowEmpty(r: number): boolean {
        for (let c = 0; c < this.columns; c++) {
            if (this.grid[r][c] != 0) {
                return false
            }
        }
        return true;
    }

    private clearRow(r: number) {
        for (let c = 0; c < this.columns; c++) {
            this.grid[r][c] = 0;
        }
    }
    private moveRowDown(r: number, numRows: number) {
        for (let c = 0; c < this.columns; c++) {
            this.grid[r + numRows][c] = this.grid[r][c];
            this.grid[r][c] = 0;
        }
    }
    public clearFullRows(): number {
        let cleared = 0

        for (let r = this.rows - 1; r >= 0; r--) {
            if (this.isRowFull(r)) {
                this.clearRow(r);
                cleared++;
            }
            else if (cleared > 0) {
                this.moveRowDown(r, cleared);
            }
        }

        return cleared
    }

    setTile(r: number, c: number, id: number){
        if(this._grid[r] == undefined ||  this._grid[r][c] == undefined){
            return
        }
        this._grid[r][c] = id;
    }


    get grid() { return this._grid }
    get rows() { return this._rows }
    get columns() { return this._columns }
}