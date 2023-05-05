import { Cell } from '../redux-state';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';
import ActionBar from './ActionBar';

import './cellItem.scss';

interface CellItemProps {
  cell: Cell
}

const CellItem: React.FC<CellItemProps> = ({ cell }) => {
  const renderItem = () => {
    switch (cell.type) {
      case 'code':
        return (
          <>
            <div className='action-bar-wrapper'>
              <ActionBar id={cell.id} />
            </div>
            <CodeCell cell={cell} />
          </>
        )
      default:
        return (
          <>
            <ActionBar id={cell.id} />
            <TextEditor cell={cell} />
          </>
        )
    }
  };

  return (
    <div className='cell-item'>
      {renderItem()}
    </div>
  )
}

export default CellItem;