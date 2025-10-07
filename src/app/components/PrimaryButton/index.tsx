type PrimaryButtonProps = {
  title: string;
  width?: string;
  height?: string;
  textSize?: "title1" | "title2" | "title3" | "title4" | "body";
  isLoading?: boolean; 
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryButton = ({
  title,
  width = "full",
  height = "full",
  textSize = "body",
  isLoading = false,
  ...rest
}: PrimaryButtonProps) => {
  const widthClass = width === "full" ? "w-full" : undefined;
  const textClass = `text-${textSize}`;

  const buttonStyle = height === "full" ? {} : { height: `${height}px` };

  return (
    <button
      style={buttonStyle}
      disabled={isLoading}
      className={`bg-primary flex justify-center items-center text-center rounded-sm cursor-pointer p-2
                  ${widthClass} 
                  hover:bg-[var(--color-primary-2)] transition-colors
                  ${isLoading ? "cursor-not-allowed" : ""}`}
      {...rest}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <span className={`text-white ${textClass} flex items-center justify-center w-full h-full`}>
          {title}
        </span>
      )}
    </button>
  );

};

export default PrimaryButton;