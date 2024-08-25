import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../../../redux/slices/StatusSlice';
import { useCustomDispatch, useCustomSelector } from '../../../redux/hooks';

const Blank = () => {
  const navigate = useNavigate();
  const appDispatch = useCustomDispatch();

  setTimeout(() => {
    console.log('Delayed for 1 second.');
    navigate('/caracterizar');
    appDispatch(setIsLoading(false));
  }, '1000');
  return <div />;
};

export default Blank;
