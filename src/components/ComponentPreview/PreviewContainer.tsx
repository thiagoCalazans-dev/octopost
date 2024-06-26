import { ReactNode } from 'react';

import scss from './PreviewContainer.module.scss';

import { IPreviewContainerProps } from './PreviewContainer.types';

function PreviewContainer(props: IPreviewContainerProps): ReactNode {
  return <div className={scss.container}>{props.children}</div>;
}

export default PreviewContainer;
