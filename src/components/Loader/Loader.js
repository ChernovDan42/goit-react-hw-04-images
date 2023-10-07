import { ThreeDots } from 'react-loader-spinner';

export function Loader() {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="rebeccapurple"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      wrapperClassName=""
      visible={true}
    />
  );
}
