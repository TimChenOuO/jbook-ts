import { Fragment, useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import AddCell from "./AddCell";
import CellItem from "./CellItem";
import { useAction } from "../hooks/useAction";

import './cellList.scss';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]));
  const { fetchCodeHtml } = useAction();

  useEffect(() => {
    fetchCodeHtml('srcDoc.html');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCells = () => cells.map(cell => (
    <Fragment key={`cell-item_${cell.id}`}>
      <CellItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderCells()}
    </div>
  )
}

export default CellList;