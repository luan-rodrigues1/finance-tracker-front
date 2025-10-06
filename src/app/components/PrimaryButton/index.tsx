type PrimaryButtonProps = {
  title: string;
  width?: string;
  height?: string;
  textSize?: "title1" | "title2" | "title3" | "title4" | "body";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryButton = ({
  title,
  width = "full",
  height = "full",
  textSize = "body",
  ...rest
}: PrimaryButtonProps) => {
  const widthClass = width === "full" ? "w-full" : undefined;
  const textClass = `text-${textSize}`;

  const buttonStyle = height === "full" ? {} : { height: `${height}px` };

  return (
    <button
      style={buttonStyle}
      className={`bg-primary flex justify-center items-center text-center rounded-sm cursor-pointer p-2
                  ${widthClass} 
                  hover:bg-[var(--color-primary-2)] transition-colors`}
      {...rest}
    >
      <span className={`text-white ${textClass} flex items-center justify-center w-full h-full`}>
        {title}
      </span>
    </button>
  );
};

export default PrimaryButton;