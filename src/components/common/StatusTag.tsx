interface StatusTagProps {
  type: 'draft' | 'shared';
  className?: string;
}

const StatusTag = ({ type, className = '' }: StatusTagProps) => {
  const styles = {
    draft: {
      bg: 'bg-[#DFE3E4]',
      text: 'text-[#657A7E]',
      label: 'Draft',
    },
    shared: {
      bg: 'bg-[#B9DBEB]',
      text: 'text-[#01272E]',
      label: 'Shared',
    },
  };

  const style = styles[type];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text} ${className}`}
    >
      {style.label}
    </span>
  );
};

export default StatusTag;
