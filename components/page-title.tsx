interface PageTitleProps {
  title?: string;
  preTitle?: string;
  subTitle?: string;
  props?: object;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  preTitle,
  subTitle,
  ...props
}) => {
  return (
    <div {...props}>
      {preTitle && <h5>{preTitle}</h5>}
      {title && <h1>{title}</h1>}
      {subTitle && <h2>{subTitle}</h2>}
    </div>
  );
};

export default PageTitle;
