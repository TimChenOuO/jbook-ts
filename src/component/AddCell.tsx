import { useAction } from '../hooks/useAction';
import { CellTypes } from '../redux-state';

import './addCell.scss';

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
  const { insertCellAfter } = useAction();
  const renderBtn = (cellType: CellTypes, btnText: string) => (
    <button
      className='button is-rounded is-primary is-small'
      onClick={() => insertCellAfter(previousCellId, cellType)}
    >
      <span className='icon is-small'>
        <i className='fas fa-plus' />
      </span>
      <span>{btnText}</span>
    </button>
  );

  return (
    <div className={`add-cell ${forceVisible ? 'force-visible' : ''}`}>
      <div className='add-buttons'>
        {renderBtn('code', 'Code')}
        {renderBtn('text', 'Text')}
      </div>
      <div className='divider'></div>
    </div>
  );
};

export default AddCell;