import { Block } from "./Block";
import { IBlock } from "./blocks/IBlock";
import { JBlock } from "./blocks/JBlock";
import { LBlock } from "./blocks/LBlock";
import { OBlock } from "./blocks/OBlock";
import { SBlock } from "./blocks/SBlock";
import { TBlock } from "./blocks/TBlock";
import { ZBlock } from "./blocks/Zblock";

export class BlockQueue {

    private blocks: Block[] = [
        new IBlock(),
        new JBlock(),
        new LBlock(),
        new OBlock(),
        new SBlock(),
        new TBlock(),
        new ZBlock(),
    ]

    public nextBlock: Block;

    constructor() {
        this.nextBlock = this.randomBlock();
    }

    private randomBlock(): Block {
        let block = this.blocks[this.randomIntFromInterval(0, this.blocks.length - 1)];
        block.reset();

        return block;
    }

    private randomIntFromInterval(min: number, max: number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    public getAndUpdate(){

        const block = this.nextBlock;

        do{
            this.nextBlock = this.randomBlock();
        }
        while(block.id == this.nextBlock.id)

        return block
    }

}