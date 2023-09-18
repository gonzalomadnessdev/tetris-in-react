import { Block } from "../Block";
import { Position } from "../Position";

export class TBlock extends Block {

    protected tiles: Position[][] = [
        [new Position(0, 1), new Position(1, 0), new Position(1, 1), new Position(1, 2)],
        [new Position(0, 1), new Position(1, 1), new Position(1, 2), new Position(2, 1)],
        [new Position(1, 0), new Position(1, 1), new Position(1, 2), new Position(2, 1)],
        [new Position(0, 1), new Position(1, 0), new Position(1, 1), new Position(2, 1)]
    ]

    public id = 6;

    protected startOffset: Position = new Position(0, 3);
    protected offset: Position = new Position(0, 0);

    constructor() {
        super();
        this.reset();
    }

}