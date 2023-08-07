import { FC } from 'react';

interface IErrorBlock {
  error: string;
}

export const ErrorBlock: FC<IErrorBlock> = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <div className="error-block">
      <small>{error}</small>
    </div>
  );
};
