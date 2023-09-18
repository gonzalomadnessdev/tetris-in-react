import { Block } from "../Block";
import { Position } from "../Position";

export class IBlock extends Block {

    protected tiles: Position[][] = [
        [new Position(1, 0), new Position(1, 1), new Position(1, 2), new Position(1, 3)],
        [new Position(0, 2), new Position(1, 2), new Position(2, 2), new Position(3, 2)],
        [new Position(2, 0), new Position(2, 1), new Position(2, 2), new Position(2, 3)],
        [new Position(0, 1), new Position(1, 1), new Position(2, 1), new Position(3, 1)]
    ]

    public id = 1;

    protected startOffset: Position = new Position(0, 3);
    protected offset: Position = new Position(0, 0);

    constructor() {
        super();
        this.reset();
    }

    public getPreviewPosition(){
        return [ ...this.tiles[0].map((p) => new Position(p.row, p.column -1) )]
    }

}