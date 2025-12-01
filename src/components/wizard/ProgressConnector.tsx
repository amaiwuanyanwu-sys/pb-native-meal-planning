import { ProgressConnectorProps } from '../../types/wizard';

const ProgressConnector = ({ isFilled }: ProgressConnectorProps) => {
  return (
    <div
      className="w-1 transition-colors duration-300"
      style={{
        backgroundColor: isFilled ? '#385459' : '#DFE3E4',
      }}
    />
  );
};

export default ProgressConnector;
