/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React from 'react';
import { render } from '@testing-library/react';
import { CustomLink } from '../../../../../../../../plugins/apm/server/lib/settings/custom_link/custom_link_types';
import { CustomLinkSection } from './CustomLinkSection';
import {
  expectTextsInDocument,
  expectTextsNotInDocument
} from '../../../../utils/testHelpers';
import { Transaction } from '../../../../../../../../plugins/apm/typings/es_schemas/ui/transaction';

describe('CustomLinkSection', () => {
  const customLinks = [
    { id: '1', label: 'foo', url: 'http://elastic.co' },
    {
      id: '2',
      label: 'bar',
      url: 'http://elastic.co?service.name={{service.name}}'
    }
  ] as CustomLink[];
  const transaction = ({
    service: { name: 'foo.bar' }
  } as unknown) as Transaction;
  it('shows links', () => {
    const component = render(
      <CustomLinkSection customLinks={customLinks} transaction={transaction} />
    );
    expectTextsInDocument(component, ['foo', 'bar']);
  });

  it('doesnt show any links', () => {
    const component = render(
      <CustomLinkSection customLinks={[]} transaction={transaction} />
    );
    expectTextsNotInDocument(component, ['foo', 'bar']);
  });
});
