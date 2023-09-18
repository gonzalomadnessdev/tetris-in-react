import { Block } from "../Block";
import { Position } from "../Position";

export class JBlock extends Block {
    /*
            private readonly Position[][] tiles = new Position[][]
        {
            new Position[] { new(0,0), new(1,0), new(1,1), new(1,2)},
            new Position[] { new(0,1), new(0,2), new(1,1), new(2,1)},
            new Position[] { new(1,0), new(1,1), new(1,2), new(2,2)},
            new Position[] { new(0,1), new(1,1), new(2,0), new(2,1)},
        };

        public override int Id => 2;
        protected override Position StartOffset => new Position(0, 3);
        protected override Position[][] Tiles => tiles;
    */

    public tiles: Position[][] = [
        [new Position(0, 0), new Position(1, 0), new Position(1, 1), new Position(1, 2)],
        [new Position(0, 1), new Position(0, 2), new Position(1, 1), new Position(2, 1)],
        [new Position(1, 0), new Position(1, 1), new Position(1, 2), new Position(2, 2)],
        [new Position(0, 1), new Position(1, 1), new Position(2, 0), new Position(2, 1)]
    ]

    public id = 2;

    protected startOffset: Position = new Position(-1, 3);
    protected offset: Position = new Position(0, 0);

    constructor() {
        super();
        this.reset();
    }

}