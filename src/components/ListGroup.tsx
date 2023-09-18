import { useState } from "react";

function ListGroup({ items, onSelectItem }: { items: string[], onSelectItem: (item: string) => void }) {
    const [selectedIdx, setSelectedIdx] = useState(-1);

    return (
        <ul className="list-group">
            {
                items.map((item, index) => <li key={item}
                    className={((selectedIdx == index) ? "list-group-item active" : "list-group-item")}
                    onClick={() => { setSelectedIdx(index); onSelectItem(item) }}>{item}</li>)
            }
        </ul>
    );

}

export default ListGroup;