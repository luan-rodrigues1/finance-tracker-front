const SettingsButton = ({ title }: { title: string }) => {
  return (
    <button
      className="bg-grey-2 flex justify-center items-center text-center rounded-sm p-1 min-w-12 cursor-pointer 
                 hover:bg-[var(--color-grey-3)] transition-colors"
    >
      <p className="text-grey-4 text-title4">{title}</p>
    </button>
  );
};

export default SettingsButton;
