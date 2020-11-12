/* @flow */

import React from 'react';

import { Row } from '@ncigdc/uikit/Flex';
import t from '@cqdg/locales/intl';

export type TProps = {
  docType: string,
  params: Object,
  prefix?: string,
  total: number,
};

const Sizes = (props: TProps) => {
  const prfOff = [props.prefix, 'offset'].filter(Boolean).join('_');
  const prfSize = [props.prefix, 'size'].filter(Boolean).join('_');

  const start = props.total ? +props.params[prfOff] + 1 : 0;
  const end = Math.min(
    +props.params[prfOff] + +props.params[prfSize],
    props.total,
  );

  return (
    <Row className="test-showing" spacing="0.5rem">
      <span
        dangerouslySetInnerHTML={{
          __html: t('global.tables.showing', {
            start: start.toLocaleString(),
            end: end.toLocaleString(),
            total: props.total.toLocaleString(),
            docType: t(`global.${props.docType}`),
          }),
        }}
        />
    </Row>
  );
};

export default Sizes;
