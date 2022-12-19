import { ReactNode } from 'react';
import { ShadowBoxContent, ShadowBoxContentProps } from './ShadowBoxContent';

type ShadowBoxProps = ShadowBoxContentProps & {
  isInverted?: boolean;
  children?: ReactNode;
};

export const ShadowBox = ({
  color,
  isInverted,
  label,
  eyebrow,
  title,
  body,
  labelLink,
  children,
}: ShadowBoxProps) => {
  const style = { backgroundColor: `${color}` };

  return (
    <div className="shadow-box">
      <div className="shadow-box-shadow" style={!isInverted ? style : {}}></div>
      <div className="shadow-box-content" style={isInverted ? style : {}}>
        {children ? (
          children
        ) : (
          <ShadowBoxContent
            color={color}
            label={label}
            eyebrow={eyebrow}
            title={title}
            body={body}
            labelLink={labelLink}
          />
        )}
      </div>
    </div>
  );
};
