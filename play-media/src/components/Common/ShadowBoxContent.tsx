import { ReactNode } from 'react';
import { getTextColor } from '../../helpers/textColorHelper';
import { ConditionalLink } from './ConditionalLink';

export type ShadowBoxContentProps = {
  color: string | undefined;
  label?: string;
  eyebrow?: string;
  title?: string;
  body?: string | ReactNode;
  labelLink?: string;
};

export const ShadowBoxContent = ({
  color,
  label,
  eyebrow,
  title,
  body,
  labelLink,
}: ShadowBoxContentProps) => {
  const style = { backgroundColor: `${color}` };

  return (
    <>
      {label && (
        <ConditionalLink link={labelLink}>
          <span className={`shadow-box-label ${getTextColor(color)}`} style={style}>
            {label}
          </span>
        </ConditionalLink>
      )}
      {eyebrow && <p className="shadow-box-eyebrow">{eyebrow}</p>}
      <div className="shadow-box-body">
        {title && <h3>{title}</h3>}
        {body && <p>{body}</p>}
      </div>
    </>
  );
};
