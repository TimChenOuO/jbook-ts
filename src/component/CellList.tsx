import { useTypedSelector } from "../hooks/useTypedSelector";
import CellItem from "./CellItem";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) => order.map((id) => data[id]));

  const renderCells = () => cells.map(cell => <CellItem key={cell.id} cell={cell} />)

  return (
    <div>
      {renderCells()}
    </div>
  )
}

export default CellList;